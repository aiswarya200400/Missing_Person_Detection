# Missing Person Tracking System

A full-stack web application designed to help authorities and citizens track missing individuals through image-based reporting, live map visualization, and hotspot prediction.

This system allows:
- Registering missing persons  
- Reporting real-time sightings  
- Automatic face similarity matching  
- Displaying all sightings on an interactive map  
- Predicting likely hotspot areas based on sightings  

---

## 🛠️ Tech Stack

### **Frontend**
- React + Vite  
- Axios  
- Leaflet (interactive map)

### **Backend**
- FastAPI  
- SQLite Database  
- Deepface face_recognition (for image matching)  
- geopy (for geolocation distance)  

---

## 📁 Project Structure

backend/
├── main.py
├── database.py
├── blockchain.py (optional hashing utility)
├── uploads/ (stored images)
├── utils/
│ ├── face_utils.py
│ ├── geo_utils.py
│ └── hashings.py
├── missing.db (SQLite DB)

frontend/
├── src/pages/
│ ├── RegisterMissing.jsx
│ ├── ReportSighting.jsx
│ ├── MapDashboard.jsx
│ └── Home.jsx
├── src/components/
├── public/
├── package.json


---

## 🚀 Running the Project

### **1. Start Backend**

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

### **1. Start Frontend**

cd frontend
npm install
npm run dev

### Registering a Missing Person

1. Log in to the admin panel
2. Navigate to "Register Missing Person"
3. Upload clear photos of the missing person
4. Fill in relevant details (name, age, last seen location, etc.)
5. Submit the form

### Submitting a Sighting

1. Go to the public submission portal
2. Upload a photo of the suspected missing person
3. Provide location and time information
4. Submit for verification
