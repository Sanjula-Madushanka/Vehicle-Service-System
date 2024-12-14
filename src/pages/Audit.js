import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Audit.css'; // Import the CSS file

export default function AuditLogs() {
  const [createdPackages, setCreatedPackages] = useState([]);
  const [deletedPackages, setDeletedPackages] = useState([]);
  const [editedPackages, setEditedPackages] = useState([]);

  useEffect(() => {
    // Fetch report details from the backend
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auditlogs');
        
        // Assuming the backend returns { created: [], deleted: [], edited: [] }
        const { created, deleted, edited } = response.data;
        setCreatedPackages(created);
        setDeletedPackages(deleted);
        setEditedPackages(edited);
      } catch (error) {
        console.error('Error fetching audit logs', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="auditlogs-container">
      <h1>Audit Report Summary</h1>
      
      {/* Created Packages */}
      <div className="report-section">
        <h2>Created Packages</h2>
        {createdPackages.length > 0 ? (
          <ul>
            {createdPackages.map((pkg, index) => (
              <li key={index}>{pkg.packageName}</li>
            ))}
          </ul>
        ) : (
          <p>No packages have been created.</p>
        )}
      </div>

      {/* Deleted Packages */}
      <div className="report-section">
        <h2>Deleted Packages</h2>
        {deletedPackages.length > 0 ? (
          <ul>
            {deletedPackages.map((pkg, index) => (
              <li key={index}>{pkg.packageName}</li>
            ))}
          </ul>
        ) : (
          <p>No packages have been deleted.</p>
        )}
      </div>

      {/* Edited Packages */}
      <div className="report-section">
        <h2>Edited Packages</h2>
        {editedPackages.length > 0 ? (
          <ul>
            {editedPackages.map((pkg, index) => (
              <li key={index}>
                {pkg.packageName} - {pkg.changes} {/* Assuming 'changes' has a brief description */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No packages have been edited.</p>
        )}
      </div>
    </div>
  );
}