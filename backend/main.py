from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil, json, os, requests

from database import Base, engine, SessionLocal
from models import MissingPerson, Sighting
from utils.face_utils import extract_embedding, cosine_similarity
from blockchain import add_block
from utils.geo_utils import predict_hotspot

# ---------- INIT ----------
Base.metadata.create_all(bind=engine)
app = FastAPI()

# ---------- CORS ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads/"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ---------------------------------------------------
# GEOCODING (FIXED WITH USER-AGENT + SAFE JSON)
# ---------------------------------------------------
def address_to_coordinates(address: str):
    url = "https://nominatim.openstreetmap.org/search"
    params = {"q": address, "format": "json"}

    headers = {
        "User-Agent": "MissingPersonFinder/1.0 (contact@email.com)"
    }

    try:
        res = requests.get(url, params=params, headers=headers, timeout=5)
        data = res.json()
    except Exception:
        return None, None

    if not data:
        return None, None

    try:
        return float(data[0]["lat"]), float(data[0]["lon"])
    except:
        return None, None


# ---------------------------------------------------
# REGISTER A MISSING PERSON (UPDATED)
# ---------------------------------------------------
@app.post("/register_missing")
async def register_missing(
    name: str = Form(...),
    age: str = Form(...),
    gender: str = Form(...),
    address: str = Form(...),
    last_seen_location: str = Form(...),
    image: UploadFile = File(...),
):
    # Convert last seen address → coordinates
    lat, long = address_to_coordinates(last_seen_location)

    if lat is None:
        return {"error": "Invalid last-seen address. Could not convert to coordinates."}

    # Save image
    file_path = os.path.join(UPLOAD_DIR, image.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # Extract embedding
    embedding = extract_embedding(file_path)
    embedding_json = json.dumps(embedding if embedding else [])

    db = SessionLocal()
    person = MissingPerson(
        name=name,
        age=age,
        gender=gender,
        address=address,
        last_seen_address=last_seen_location,
        last_seen_lat=lat,
        last_seen_long=long,
        image_path=file_path,
        embedding=embedding_json,
    )
    db.add(person)
    db.commit()

    # Add block to ledger
    add_block(person.id)

    return {"message": "Missing person registered!", "id": person.id}


# ---------------------------------------------------
# REPORT A NEW SIGHTING (UPDATED)
# ---------------------------------------------------
@app.post("/report_sighting")
async def report_sighting(
    location_found: str = Form(...),
    image: UploadFile = File(...),
):
    # Convert address → coordinates
    lat, long = address_to_coordinates(location_found)

    if lat is None:
        return {"error": "Invalid sighting location. Could not convert to coordinates."}

    # Save image
    file_path = os.path.join(UPLOAD_DIR, image.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # Extract embedding
    sight_embedding = extract_embedding(file_path)

    db = SessionLocal()
    people = db.query(MissingPerson).all()

    best_match = None
    best_score = 0.0

    for p in people:
        emb = json.loads(p.embedding)
        score = cosine_similarity(emb, sight_embedding) if emb and sight_embedding else 0.0

        if score > best_score:
            best_score = score
            best_match = p

    sight = Sighting(
        image_path=file_path,
        address=location_found,
        latitude=lat,
        longitude=long,
        matched_person_id=best_match.id if best_score > 0.6 else None,
    )
    db.add(sight)
    db.commit()

    return {
        "match": best_match.name if best_score > 0.6 else None,
        "score": float(best_score),
    }


# ---------------------------------------------------
# HOTSPOT PREDICTION
# ---------------------------------------------------
@app.get("/hotspot")
def get_hotspot():
    db = SessionLocal()
    coords = [(s.latitude, s.longitude) for s in db.query(Sighting).all()]
    hotspot = predict_hotspot(coords)
    return {"hotspot": hotspot}


# ---------------------------------------------------
# GET ALL SIGHTINGS (Map)
# ---------------------------------------------------
@app.get("/sightings")
def get_sightings():
    db = SessionLocal()
    sightings = db.query(Sighting).all()

    return [
        {
            "id": s.id,
            "address": s.address,
            "latitude": s.latitude,
            "longitude": s.longitude,
            "image_path": s.image_path,
            "matched_person_id": s.matched_person_id,
        }
        for s in sightings
    ]
