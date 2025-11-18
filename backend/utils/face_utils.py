from deepface import DeepFace
import numpy as np

def extract_embedding(image_path):
    try:
        rep = DeepFace.represent(
            img_path=image_path,
            model_name="Facenet",
            enforce_detection=False  # <-- IMPORTANT
        )

        # DeepFace returns list of dicts
        if rep and "embedding" in rep[0]:
            return rep[0]["embedding"]

        return None

    except Exception as e:
        print("Embedding error:", e)
        return None


def cosine_similarity(a, b):
    # If either embedding is missing → score = 0
    if a is None or b is None:
        return 0.0

    a = np.array(a, dtype=float)
    b = np.array(b, dtype=float)

    # Prevent crashing from zero norm
    if np.linalg.norm(a) == 0 or np.linalg.norm(b) == 0:
        return 0.0

    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))
