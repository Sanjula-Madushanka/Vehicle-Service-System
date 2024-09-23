import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Maintenance.css';
import logo from '../assets/logo.png';

const URL = "http://localhost:5000/packages";

const fetchPackages = async () => {
  try {
    const response = await axios.get(URL);
    return response.data.packages;
  } catch (error) {
    console.error("Error fetching packages", error);
    return [];
  }
};

const deletePackage = async (id) => {
  try {
    await axios.delete(`${URL}/${id}`);
    window.location.reload();
  } catch (error) {
    console.error("Error deleting package", error);
  }
};

export default function Maintenance() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPackages = async () => {
      const fetchedPackages = await fetchPackages();
      setPackages(fetchedPackages);
    };
    loadPackages();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-package/${id}`);
  };

  const handleDelete = (id) => {
    deletePackage(id);
  };

  return (
    <div className="maintenance-container">
      
      <div className="logo-container">
        <img src={logo} alt="Company Logo" className="logo" /> 
      </div>
      
      <h1>Service Package Maintenance</h1>
      <table className="packages-table">
        <thead>
          <tr>
            <th>Package Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <tr key={pkg._id}>
                <td>{pkg.packageName}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(pkg._id)}>Edit</button>
                </td>
                <td>
                  <button className="delete-button" onClick={() => handleDelete(pkg._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No packages available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
