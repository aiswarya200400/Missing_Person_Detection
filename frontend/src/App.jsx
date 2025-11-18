import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import RegisterMissing from "./pages/RegisterMissing.jsx";
import ReportSighting from "./pages/ReportSighting.jsx";
import MapDashboard from "./pages/MapDashboard.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterMissing />} />
        <Route path="/report" element={<ReportSighting />} />
        <Route path="/map" element={<MapDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
