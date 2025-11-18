import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import axios from "axios";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ---------------------------
// Custom Icons
// ---------------------------
const hotspotIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/484/484167.png",
  iconSize: [45, 45],
  iconAnchor: [22, 45],
});

const sightingIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Smooth fly animation
function FlyToHotspot({ lat, long }) {
  const map = useMap();
  useEffect(() => {
    if (lat && long) {
      map.flyTo([lat, long], 10, { duration: 2 });
    }
  }, [lat, long]);
  return null;
}

export default function MapDashboard() {
  const [hotspot, setHotspot] = useState(null);
  const [sightings, setSightings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8000/hotspot"),
      axios.get("http://localhost:8000/sightings"),
    ])
      .then(([hotRes, sightRes]) => {
        setHotspot(hotRes.data.hotspot);
        setSightings(sightRes.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const validLat = hotspot?.[0] ? parseFloat(hotspot[0]) : null;
  const validLong = hotspot?.[1] ? parseFloat(hotspot[1]) : null;

  const isHotspotValid = hotspot && !isNaN(validLat) && !isNaN(validLong);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(to bottom right, #eef5ff, #ffffff)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <h1
        style={{
          textAlign: "center",
          padding: "20px 0",
          margin: 0,
          fontSize: "32px",
          fontWeight: "700",
          color: "#003566",
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(6px)",
          borderBottom: "1px solid #dce3f0",
        }}
      >
        🔍 Missing Person Tracking Dashboard
      </h1>

      {/* Loading */}
      {loading && (
        <p
          style={{
            textAlign: "center",
            color: "#555",
            fontSize: "16px",
            marginTop: "10px",
          }}
        >
          Loading map data...
        </p>
      )}

      {/* Map Section */}
      <div
        style={{
          flex: 1,
          width: "100%",
          padding: "20px",
          paddingTop: "10px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0px 4px 18px rgba(0,0,0,0.18)",
          }}
        >
          <MapContainer
            center={[20, 78]}
            zoom={5}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {isHotspotValid && (
              <FlyToHotspot lat={validLat} long={validLong} />
            )}

            {/* Hotspot */}
            {isHotspotValid && (
              <Marker position={[validLat, validLong]} icon={hotspotIcon}>
                <Popup>
                  <div style={{ textAlign: "center" }}>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#d00000",
                      }}
                    >
                      🔥 Predicted Hotspot
                    </h3>
                    <p style={{ margin: "6px 0", fontSize: "14px" }}>
                      High probability of sighting detected here.
                    </p>
                    <p style={{ fontSize: "13px", color: "#666" }}>
                      Lat: {validLat.toFixed(4)} <br /> Long:{" "}
                      {validLong.toFixed(4)}
                    </p>
                  </div>
                </Popup>
              </Marker>
            )}

            {/* Sightings */}
            {sightings.map((s) => (
              <Marker
                key={s.id}
                position={[s.latitude, s.longitude]}
                icon={sightingIcon}
              >
                <Popup>
                  <div style={{ textAlign: "center" }}>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      👁 Sighting Report
                    </h3>

                    <p style={{ margin: "6px 0", fontSize: "13px" }}>
                      {s.matched_person_id
                        ? `Matched Person ID: ${s.matched_person_id}`
                        : "No match detected"}
                    </p>

                    <img
                      src={`http://localhost:8000/${s.image_path}`}
                      alt="sighting"
                      style={{
                        width: "130px",
                        height: "130px",
                        borderRadius: "8px",
                        objectFit: "cover",
                        marginTop: "8px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                      }}
                    />

                    <p style={{ marginTop: "8px", fontSize: "12px" }}>
                      Lat: {s.latitude.toFixed(4)} <br />
                      Long: {s.longitude.toFixed(4)}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* No hotspot warning */}
      {!loading && !isHotspotValid && (
        <div
          style={{
            textAlign: "center",
            padding: "10px",
            color: "#d00000",
            background: "rgba(255,200,200,0.3)",
            borderTop: "1px solid #ffb3b3",
          }}
        >
          No hotspot detected yet. Upload more sightings.
        </div>
      )}
    </div>
  );
}
