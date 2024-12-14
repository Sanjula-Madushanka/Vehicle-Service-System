import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Details.css';

export default function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const { package: pkg } = location.state;

  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(pkg); // State to store the selected package
  const URL = "http://localhost:5000/packages";

  // Fetch packages from backend
  const fetchPackages = async () => {
    try {
      const response = await axios.get(URL);
      setPackages(response.data.packages);
    } catch (error) {
      console.error("Error fetching packages", error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleBookNow = () => {
    navigate('/p8', { state: { package: selectedPackage } });
  };

  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg); // Update the selected package when clicked
  };

  return (
    <div className="details-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h2 className="package-title">{selectedPackage.packageName}</h2>
      </div>

      {/* Package Details */}
      <div className="package-details">
        <p><strong>Description:</strong> {selectedPackage.description}</p>
        <p><strong>Services Included:</strong> {selectedPackage.servicesIncluded}</p>
        <p><strong>Price:</strong> ₨{selectedPackage.price}</p>
        <p><strong>Special Offer:</strong> ₨{selectedPackage.specialOffer}</p>
        <p><strong>Total Price:</strong> ₨{selectedPackage.price - selectedPackage.specialOffer}</p>
        <button className="book-now-button" onClick={handleBookNow}>
          Book Now
        </button>
      </div>

      {/* Packages Section */}
      <div className="packages-section">
        <div className="packages-header-container">
          <h2 className="packages-header1">Available</h2>
          <h2 className="packages-header2">Packages</h2>
        </div>
        <div className="packages-list">
          {packages.map((pkg, index) => (
            <div key={index} className="package-name" onClick={() => handlePackageClick(pkg)}>
              {pkg.packageName}
            </div>
          ))}
        </div>
      </div>
    
      
<footer className="footer-section">
  <div className="footer-container">
    <div className="footer-column">
      <h3>About Us</h3>
      <p>
        We provide a full range of vehicle care services, ensuring your car remains in top condition. From routine maintenance to complex repairs, our expert mechanics are here to help.
      </p>
    </div>

    <div className="footer-column">
      <h3>Contact Us</h3>
      <ul>
        <li><strong>Address:</strong> 123 Auto Lane, Cityville, ST 45678</li>
        <li><strong>Phone:</strong> (123) 456-7890</li>
        <li><strong>Email:</strong> support@carservicestation.com</li>
      </ul>
    </div>

    <div className="footer-column">
      <h3>Working Hours</h3>
      <ul>
        <li>Mon - Fri: 8:00 AM - 6:00 PM</li>
        <li>Saturday: 8:00 AM - 4:00 PM</li>
        <li>Sunday: Closed</li>
      </ul>
    </div>

   {/* <div className="footer-column">
      <h3>Follow Us</h3>
      <div className="social-icons">
        <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
        <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
        <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
        <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
      </div>
    </div> */} 
  </div>

  <div className="footer-bottom">
    <p>&copy; 2024 Car Service Station. All Rights Reserved.</p>
  </div>
</footer>

    </div>
  );
}
    
    
