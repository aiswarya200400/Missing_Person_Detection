from sqlalchemy import Column, Integer, String, Float
from database import Base

class MissingPerson(Base):
    __tablename__ = "missing_people"

    id = Column(Integer, primary_key=True, index=True)

    # Basic details
    name = Column(String)
    age = Column(String)
    gender = Column(String)
    address = Column(String)

    # Last seen textual address
    last_seen_address = Column(String)

    # Geocoded coordinates
    last_seen_lat = Column(Float)
    last_seen_long = Column(Float)

    # Image + Embedding
    image_path = Column(String)
    embedding = Column(String)


class Sighting(Base):
    __tablename__ = "sightings"

    id = Column(Integer, primary_key=True, index=True)

    # Location text
    address = Column(String)

    # Converted coordinates
    latitude = Column(Float)
    longitude = Column(Float)

    # Uploaded image
    image_path = Column(String)

    # AI match
    matched_person_id = Column(Integer)
