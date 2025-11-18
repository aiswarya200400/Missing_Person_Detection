import axios from "axios";
import { useState } from "react";

export default function RegisterMissing() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    address: "",
    last_seen_location: ""
  });

  const [file, setFile] = useState(null);

  const updateField = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.age || !form.gender || !form.address || !form.last_seen_location || !file) {
      alert("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("age", form.age);
    formData.append("gender", form.gender);
    formData.append("address", form.address);
    formData.append("last_seen_location", form.last_seen_location);
    formData.append("image", file);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/register_missing",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Missing person registered successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Error registering person.");
    }
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
          background: "#ffffff",
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
          Register Missing Person
        </h1>

        <form onSubmit={submit}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Full Name *"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />

          <input
            style={inputStyle}
            type="number"
            placeholder="Age *"
            value={form.age}
            onChange={(e) => updateField("age", e.target.value)}
          />

          <select
            style={{
              ...inputStyle,
              background: "#f9f9f9",
              color: "#000",
              appearance: "none",
            }}
            value={form.gender}
            onChange={(e) => updateField("gender", e.target.value)}
          >
            <option value="" style={{ color: "#000" }}>Select Gender *</option>
            <option style={{ color: "#000" }}>Male</option>
            <option style={{ color: "#000" }}>Female</option>
            <option style={{ color: "#000" }}>Other</option>
          </select>

          <textarea
            style={{ ...inputStyle, height: "90px" }}
            placeholder="Permanent Address *"
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
          />

          <textarea
            style={{ ...inputStyle, height: "90px" }}
            placeholder="Last Seen Address *"
            value={form.last_seen_location}
            onChange={(e) => updateField("last_seen_location", e.target.value)}
          />

          <input
            style={inputStyle}
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              background: "#000",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "600",
              cursor: "pointer",
              marginTop: "10px",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#333")}
            onMouseOut={(e) => (e.target.style.background = "#000")}
          >
            Register Missing Person
          </button>
        </form>
      </div>
    </div>
  );
}
