import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0A0F1F, #101820, #0D1117)",
        minHeight: "100vh",
        padding: "50px 40px",
        color: "white",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* ---------------- HERO SECTION ---------------- */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "800",
            background: "linear-gradient(to right, #66C3FF, #4AE3B5)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Missing Person Identification System
        </h1>

        <p
          style={{
            fontSize: "19px",
            opacity: 0.85,
            maxWidth: "650px",
            margin: "10px auto",
            lineHeight: "1.6",
          }}
        >
          An AI-powered platform for identifying missing individuals using facial
          recognition, community reporting, and real-time location intelligence.
        </p>
      </div>

      {/* ---------------- 3 FEATURE CARDS ---------------- */}
      <div
        style={{
          display: "flex",
          gap: "25px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* CARD 1 */}
        <Link
          to="/register"
          style={{ textDecoration: "none", flex: "1", minWidth: "300px" }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              padding: "30px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
              height: "180px",
              transition: "0.25s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h2 style={{ color: "#63C7FF", fontSize: "22px" }}>Register a Case</h2>
            <p style={{ opacity: 0.8 }}>
              Add a missing person with their details, image, and last seen
              location.
            </p>
          </div>
        </Link>

        {/* CARD 2 */}
        <Link
          to="/report"
          style={{ textDecoration: "none", flex: "1", minWidth: "300px" }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              padding: "30px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
              height: "180px",
              transition: "0.25s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h2 style={{ color: "#FFD75E", fontSize: "22px" }}>Report a Sighting</h2>
            <p style={{ opacity: 0.8 }}>
              Upload a sighting photo and location—help authorities by sharing
              leads.
            </p>
          </div>
        </Link>

        {/* CARD 3 */}
        <Link
          to="/map"
          style={{ textDecoration: "none", flex: "1", minWidth: "300px" }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              padding: "30px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
              height: "180px",
              transition: "0.25s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h2 style={{ color: "#7DFF9E", fontSize: "22px" }}>Live Map Dashboard</h2>
            <p style={{ opacity: 0.8 }}>
              View sightings, predicted hotspots, and possible movement patterns.
            </p>
          </div>
        </Link>
      </div>

      {/* ---------------- WHAT THIS APP DOES ---------------- */}
      <div
        style={{
          marginTop: "60px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
          padding: "35px",
          borderRadius: "14px",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <h2 style={{ fontSize: "26px", fontWeight: "700", marginBottom: "15px" }}>
          What This System Does
        </h2>
        <p style={{ fontSize: "17px", opacity: 0.85, lineHeight: "1.7" }}>
          This platform helps families, volunteers, and authorities collaboratively
          track missing persons using:
        </p>

        <ul style={{ marginTop: "15px", lineHeight: "1.9", fontSize: "16px" }}>
          <li>AI facial embeddings for identity matching</li>
          <li>Geo-tagged reporting from citizens</li>
          <li>Real-time hotspot prediction algorithms</li>
          <li>Visual map dashboard to understand movement patterns</li>
        </ul>
      </div>

      {/* ---------------- KEY FEATURES ---------------- */}
      <div
        style={{
          marginTop: "40px",
          padding: "35px",
          borderRadius: "14px",
          background: "#F1F5F9",
          color: "#111",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "10px" }}>
          Key Features
        </h2>

        <div style={{ fontSize: "16px", lineHeight: "1.8" }}>
          <p>✔ Facial recognition-based matching</p>
          <p>✔ Sighting uploads from the public</p>
          <p>✔ Automatic clustering & hotspot prediction</p>
          <p>✔ GPS-based location tracking</p>
          <p>✔ Clean, intuitive dashboard for easy access</p>
        </div>
      </div>

      {/* ---------------- WHY THIS MATTERS ---------------- */}
      <div
        style={{
          marginTop: "40px",
          padding: "35px",
          borderRadius: "14px",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(8px)",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "10px" }}>
          Why This Matters
        </h2>

        <p style={{ fontSize: "17px", opacity: 0.85, lineHeight: "1.7" }}>
          Thousands of missing cases go untracked due to lack of centralized
          reporting and slow manual verification.  
          This system aims to bridge that gap by combining **AI**, **real-time location
          data**, and **community reporting** into one powerful tool.
        </p>
      </div>

      <p
        style={{
          textAlign: "center",
          marginTop: "45px",
          opacity: 0.5,
          fontSize: "15px",
        }}
      >
        © Missing Person Identification Platform — Designed for public good.
      </p>
    </div>
  );
}
