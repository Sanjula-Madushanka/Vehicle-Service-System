import '../Styles/Creation.css'; 
import React, { useState } from 'react';
import axios from 'axios';

export default function Creation({ onPackageCreated }) {
  const [packageData, setPackageData] = useState({
    packageName: '',
    description: '',
    price: '',
    servicesIncluded: '',
    specialOffer: '', // specialOffer is now the last field, it's optional
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Formatter for numbers with commas (e.g., 10,000)
  const formatPrice = (value) => {
    const numericValue = value.replace(/,/g, ''); // Remove commas for the numeric value
    if (!isNaN(numericValue) && numericValue !== '') {
      return new Intl.NumberFormat('en-IN').format(numericValue); // Add commas back
    }
    return value;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "price" || id === "specialOffer") {
      const numericValue = value.replace(/,/g, ''); // Remove commas for processing
      if (/^[0-9]*$/.test(numericValue) && numericValue <= 1000000) { // Max price limit of 100000
        setPackageData({
          ...packageData,
          [id]: formatPrice(numericValue), // Format value with commas
        });
      }
    } else if (id === "packageName" || id === "description" || id === "servicesIncluded") {
      // Allow only letters and spaces
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setPackageData({
          ...packageData,
          [id]: value,
        });
      }
    } else {
      setPackageData({
        ...packageData,
        [id]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...packageData,
      price: packageData.price.replace(/,/g, ''), // Remove commas for submission
      specialOffer: packageData.specialOffer ? packageData.specialOffer.replace(/,/g, '') : '', 
    };

    // Validate that the special offer is not greater than the price
    if (formattedData.specialOffer && parseFloat(formattedData.specialOffer) > parseFloat(formattedData.price)) {
      setErrorMessage("Special offer cannot be greater than the price.");
      return; // Stop submission
    }

    // Clear the error message before submission
    setErrorMessage('');

    try {
      await axios.post("http://localhost:5000/packages", formattedData);
      onPackageCreated(); 
      setPackageData({
        packageName: '',
        description: '',
        price: '',
        servicesIncluded: '',
        specialOffer: '', // Reset special offer after successful submission
      });
    } catch (error) {
      console.log("Error creating package", error);
    }
  };

  return (
    <main className="creation-container">
      <div className="logo-container">
        {/* Add logo here */}
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
              type="text"
              id="price"
              value={packageData.price}
              onChange={handleChange}
              maxLength="7"
              required
              className="input-field"
              placeholder="Price (₨)"
            />
            <p>Price (₨ / package)</p>
          </div>
          <div className="flex-item">
            <input
              type="text"
              id="specialOffer"
              value={packageData.specialOffer}
              onChange={handleChange}
              maxLength="7"
              className="input-field"
              placeholder="Special Offer (optional)"
            />
            <p>Special Offer (₨ / package)</p>
          </div>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}

        <button className="submit-button" type="submit">
          Create Package
        </button>
      </form>
    </main>
  );
}
