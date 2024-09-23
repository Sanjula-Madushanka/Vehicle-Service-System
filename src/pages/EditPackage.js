import '../Styles/EditPackage.css'; 
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/micro-automotive-logo.png'; // Import the logo

export default function EditPackage({ onPackageUpdated }) {
  const { id } = useParams();
  const [packageData, setPackageData] = useState({
    packageName: '',
    description: '',
    price: '',
    specialOffer: '',
    servicesIncluded: '',
  });

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/packages/${id}`);
        setPackageData(response.data.package);
      } catch (error) {
        console.error("Error fetching package data", error);
      }
    };
    fetchPackage();
  }, [id]);

  const handleChange = (e) => {
    setPackageData({
      ...packageData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/packages/${id}`, packageData);
      onPackageUpdated(); 
      alert("Package updated successfully!");
    } catch (error) {
      console.log("Error updating package", error);
    }
  };

  return (
    <main className="edit-container">

      <div className="logo-container">
        <img src={logo} alt="Micro Automotive Logo" className="logo" />
      </div>
      <h1 className="edit-title">Edit Package</h1>
      
   
      <form className="edit-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Package Name"
          className="input-field"
          id="packageName"
          value={packageData.packageName}
          onChange={handleChange}
          maxLength="62"
          minLength="5"
          required
        />
        <textarea
          placeholder="Description"
          className="input-field"
          id="description"
          value={packageData.description}
          onChange={handleChange}
          required
        />
        <textarea
          placeholder="Services Included"
          className="input-field"
          id="servicesIncluded"
          value={packageData.servicesIncluded}
          onChange={handleChange}
          required
        />
        <div className="flex-wrap-container">
          <div className="flex-item">
            <input
              type="number"
              step="0.01"
              id="price"
              value={packageData.price}
              onChange={handleChange}
              min="0.01"
              max="10000"
              required
              className="input-field"
              placeholder="Price"
            />
            <p>Price ($ / package)</p>
          </div>
          <div className="flex-item">
            <input
              type="number"
              step="0.01"
              id="specialOffer"
              value={packageData.specialOffer}
              onChange={handleChange}
              min="0.00"
              max="10000"
              className="input-field"
              placeholder="Special Offer (optional)"
            />
            <p>Special Offer ($ / package)</p>
          </div>
        </div>
        <button className="submit-button" type="submit">
          Update Package
        </button>
      </form>
    </main>
  );
}
