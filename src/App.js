import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auditlogs from "./pages/Auditlogs";
import Maintenance from "./pages/Maintenance";
import Creation from "./pages/Creation";
import Packages from "./pages/Packages";
import Sidebar from "./components/Sidebar";
import EditPackage from "./pages/EditPackage";
import PDetails from "./pages/PDetails";
import "./App.css";
import './Styles/Dashboard.css';





function App() {
  return (
    <div className="app-container">
      <Sidebar /> {/* Sidebar will always be visible */}
      <div className="content-container">
        {" "}
        {/* This will be the main content area */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/p1" element={<Auditlogs />} />
          <Route path="/p2" element={<Maintenance />} />
          <Route path="/p3" element={<Creation />} />
          <Route path="/p4" element={<Packages />} />
          <Route path="/edit-package/:id" element={<EditPackage />} />
          <Route path="/p6" element={<PDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
