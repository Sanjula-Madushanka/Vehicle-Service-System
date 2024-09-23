import React from "react";
import "./sidebar.css";
import sidebarImage from "../assets/sidebar.png";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      {/* Profile Picture */}
      <div className="profile-section">
        <img src={sidebarImage} alt="Profile" className="profile-img" />
      </div>

      {/* Navigation */}
      <nav className="nav-links">
        <Link to="/" className="nav-button">
          Dashboard
        </Link>
        <Link to="/YourAccount" className="nav-button">
          Your Account
        </Link>
        <Link to="/Settings" className="nav-button">
          Settings
        </Link>
        <Link to="/Help" className="nav-button">
          Help
        </Link>
      </nav>

      {/* Sign Out */}
      <button className="signout-button">Sign out</button>
    </div>
  );
}
