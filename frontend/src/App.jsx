import React from "react";
import "antd/dist/reset.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home"; 
import DashboardRedirect from "./pages/DashboardRedirect";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorOverview from "./pages/DoctorOverview";
import Support from "./pages/Support"; 
import Wellness from "./pages/Wellness";
import Event from "./pages/Event";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />     
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardRedirect />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-overview" element={<DoctorOverview />} />
        <Route path="/support" element={<Support />} />
        <Route path="/events" element={<Event />} />
        <Route path="/wellness" element={<Wellness />} />
      </Routes>
    </Router>
  );
};

export default App;
