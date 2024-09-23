import '../Styles/Creation.css'; 
import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/micro-automotive-logo.png'; 

export default function Creation({ onPackageCreated }) {
  const [packageData, setPackageData] = useState({
    packageName: '',
    description: '',
    price: '',
    specialOffer: '',
    servicesIncluded: '',
  });

  const handleChange = (e) => {
    setPackageData({
      ...packageData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/packages", packageData);
      onPackageCreated(); 
      setPackageData({ 
        packageName: '',
        description: '',
        price: '',
        specialOffer: '',
        servicesIncluded: '',
      });
    } catch (error) {
      console.log("Error creating package", error);
    }
  };

  return (
    <main className="creation-container">
     
      <div className="logo-container">
        <img src={logo} alt="Micro Automotive Logo" className="logo" />
      </div>
      <h1 className="creation-title">Create New Package</h1>
      
  
      <form className="creation-form" onSubmit={handleSubmit}>
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
          Create Package
        </button>


        
      </form>
    </main>
  );
}
