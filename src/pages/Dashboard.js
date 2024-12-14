import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Dashboard.css';

import packageCreationIcon from '../assets/package-creation-icon.png';
import packageMaintenanceIcon from '../assets/package-maintenance-icon.png';
import packagesIcon from '../assets/packages-icon.png';
//import auditLogsIcon from '../assets/audit-logs-icon.png';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
       {/* <img src={logo} alt="Micro Automotive Logo" className="dashboard-logo" />
       import logo from '../assets/micro-automotive-logo.png'; // Import logo */} 
        <h1 className="dashboard-title">Manager Dashboard</h1>
      </header>

      <div className="dashboard-cards">
        <Link to="/p3" className="card-link">
          <div className="card">
            <img src={packageCreationIcon} alt="Package Creation" className="card-icon" />
            <p>Package Creation</p>
          </div>
        </Link>

        <Link to="/p2" className="card-link">
          <div className="card">
            <img src={packageMaintenanceIcon} alt="Package Maintenance" className="card-icon" />
            <p className="highlighted">Package Maintenance</p>
          </div>
        </Link>

        <Link to="/p4" className="card-link">
          <div className="card">
            <img src={packagesIcon} alt="Packages" className="card-icon" />
            <p>Packages</p>
          </div>
        </Link>
        {/*
        <Link to="/p1" className="card-link">
          <div className="card">
            <img src={auditLogsIcon} alt="Audit Logs" className="card-icon" />
            <p>Audit Logs</p>
          </div>
        </Link>
        */}
      </div>
    </div>
  );
}
