import React from "react";
import "./sidebar.css";
import sidebarImage from "../assets/micro-automotive-logo.png";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Profile Picture */}
      <div className="profile-section">
        <img src={sidebarImage} alt="Profile" className="profile-pic" />
      </div>

      {/* Navigation */}
      <ul className="sidebar-menu">
        <li>
          <Link to="/" className="active">Home</Link>
        </li>
        <li>
          <Link to="/YourAccount">Your Account</Link>
        </li>
        <li>
          <Link to="/Settings">Settings</Link>
        </li>
        <li>
          <Link to="/Help">Help</Link>
        </li>
      </ul>

      {/* Sign Out */}
      <button className="signout-btn">Sign out</button>
    </aside>
  );
}
