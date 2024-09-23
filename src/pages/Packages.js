import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import '../Styles/Packages.css';

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

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [noResults, setNoResults] = useState(false);

  
  const loadPackages = async () => {
    const fetchedPackages = await fetchPackages();
    setPackages(fetchedPackages);
    setFilteredPackages(fetchedPackages);  
  };

  useEffect(() => {
    loadPackages();
  }, []);

  
  const handleSearch = () => {
    const filtered = packages.filter((pkg) =>
      Object.values(pkg).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredPackages(filtered);
    setNoResults(filtered.length === 0);
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

     
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search packages..."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">Search</button>

      
      <div ref={componentRef}>
        {noResults ? (
          <p>No packages found</p>
        ) : (
          filteredPackages.map((pkg, index) => (
            <div key={index} className="package-item">
              <h3>{pkg.packageName}</h3>
              <p>{pkg.description}</p>
              <p>Price: ${pkg.price}</p>
              <p>Special Offer: ${pkg.specialOffer}</p>
              <p>Services Included: {pkg.servicesIncluded}</p>
            </div>
          ))
        )}
      </div>

 
      <button onClick={handlePrint} className="print-button">
        Download Report
      </button>
    </div>
  );
}
