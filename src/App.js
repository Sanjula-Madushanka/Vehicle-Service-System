import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auditlogs from "./pages/Auditlogs";
import Maintenance from "./pages/Maintenance";
import Creation from "./pages/Creation";
import Packages from "./pages/Packages";
import Sidebar from "./components/Sidebar";
import EditPackage from "./pages/EditPackage";
import PDetails from "./pages/PDetails";
import Details from './pages/Details';
import Bookk from './pages/Bookk'; // Import Bookk page
import "./App.css";
import './Styles/Dashboard.css';

function App() {
  const location = useLocation();

  // Conditionally render the Sidebar based on the current path
  const showSidebar = location.pathname !== '/p6' && location.pathname !== '/p7' && location.pathname !== '/p8'; // Exclude sidebar for PDetails, Details, and Bookk

  return (
    <div className="app-container">
      {showSidebar && <Sidebar />} 
      <div className={`content-container ${showSidebar ? '' : 'full-width'}`}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/p1" element={<Auditlogs />} />
          <Route path="/p2" element={<Maintenance />} />
          <Route path="/p3" element={<Creation />} />
          <Route path="/p4" element={<Packages />} />
          <Route path="/edit-package/:id" element={<EditPackage />} />
          <Route path="/p6" element={<PDetails />} />
          <Route path="/p7" element={<Details />} />
          <Route path="/p8" element={<Bookk />} /> {/* Add route for Bookk */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
