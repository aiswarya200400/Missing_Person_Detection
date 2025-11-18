import axios from "axios";
import { useState } from "react";

export default function ReportSighting() {
  const [form, setForm] = useState({ address: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateField = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const submit = async () => {
    if (!form.address || !file) {
      alert("Please enter the address and upload a photo!");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("location_found", form.address);
      data.append("image", file);

      const res = await axios.post(
        "http://localhost:8000/report_sighting",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert(
        `Match Found: ${res.data.match ?? "None"}\nSimilarity Score: ${res.data.score}`
      );
    } catch (err) {
      console.error(err);
      alert("Error reporting sighting. Please try again.");
    }

    setLoading(false);
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    marginBottom: "16px",
    borderRadius: "8px",
    border: "2px solid #333",
    fontSize: "16px",
    background: "#f9f9f9",
    color: "#000",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #000000, #3b3b3b)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "550px",
          background: "white",
          padding: "40px",
          borderRadius: "14px",
          boxShadow: "0 10px 25px rgba(255,255,255,0.2)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "25px",
            fontSize: "28px",
            color: "#000",
            fontWeight: "700",
          }}
        >
          Report a Sighting
        </h1>

        {/* Address Textarea */}
        <textarea
          style={{ ...inputStyle, height: "110px" }}
          placeholder="Exact Location of Sighting * (Example: MG Road Metro Station, Bangalore)"
          value={form.address}
          onChange={(e) => updateField("address", e.target.value)}
        />

        {/* File Upload */}
        <input
          type="file"
          accept="image/*"
          style={inputStyle}
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* Submit Button */}
        <button
          onClick={submit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "16px",
            background: "#000",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#333")}
          onMouseOut={(e) => (e.target.style.background = "#000")}
        >
          {loading ? "Submitting..." : "Submit Sighting"}
        </button>
      </div>
    </div>
  );
}
