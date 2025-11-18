import numpy as np
from sklearn.cluster import KMeans

def predict_hotspot(coords):
    if len(coords) < 2:
        return None
    coords_arr = np.array(coords)
    kmeans = KMeans(n_clusters=1)
    kmeans.fit(coords_arr)
    return kmeans.cluster_centers_[0].tolist()
