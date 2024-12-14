import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import '../Styles/Packages.css';

const URL = "http://localhost:5000/packages";

// Function to fetch packages data
const fetchPackages = async () => {
  try {
    const response = await axios.get(URL);
    return response.data.packages;
  } catch (error) {
    console.error("Error fetching packages", error);
    return [];
  }
};

// Function to format prices (e.g., 10,00,000)
const formatPrice = (value) => {
  if (!isNaN(value) && value !== '') {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(value);
  }
  return value;
};

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [noResults, setNoResults] = useState(false);

  // Load packages on component mount
  const loadPackages = async () => {
    const fetchedPackages = await fetchPackages();
    setPackages(fetchedPackages);
    setFilteredPackages(fetchedPackages);
  };

  useEffect(() => {
    loadPackages();
  }, []);

  // Filter packages based on the search query
  const handleSearch = (query) => {
    if (query.trim() === '') {
      setFilteredPackages(packages);
      setNoResults(false);
      return;
    }

    const filtered = packages.filter((pkg) =>
      pkg.packageName.toLowerCase().includes(query.toLowerCase()) ||
      pkg.servicesIncluded.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredPackages(filtered);
    setNoResults(filtered.length === 0);
  };

  // Update search query as the user types
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query); // Perform search on every input change
  };

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Package Report",
    onAfterPrint: () => alert("Print Successful"),
  });

  return (
    <div>
      <h2>Available Packages</h2>

      <div className="search-container">
        <div className="search-inner">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search packages..."
            className="search-input"
          />
        </div>
      </div>

      <div ref={componentRef} className="package-table-container">
        {noResults ? (
          <p>No packages found</p>
        ) : (
          <table className="package-table">
            <thead>
              <tr>
                <th>Package Name</th>
                <th>Description</th>
                <th>Services Included</th> {/* Services moved to 3rd position */}
                <th>Price (₨)</th>
                <th>Special Offer (₨)</th>
                <th>Total Price (₨)</th>
              </tr>
            </thead>
            <tbody>
              {filteredPackages.map((pkg, index) => {
                const totalPrice = pkg.price - pkg.specialOffer;
                return (
                  <tr key={index}>
                    <td>{pkg.packageName}</td>
                    <td>{pkg.description}</td>
                    <td>{pkg.servicesIncluded}</td> {/* Services Included added */}
                    <td>{formatPrice(pkg.price)}</td>
                    <td>{formatPrice(pkg.specialOffer)}</td>
                    <td>{formatPrice(totalPrice)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <button onClick={handlePrint} className="print-button">
        Download Report
      </button>
    </div>
  );
}
