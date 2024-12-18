import React from 'react';
import { Link } from 'react-router-dom';
import './welcome.css'; // Create a CSS file for styles

const Welcome = () => { // Change to uppercase 'W'
  return (
    <div className="welcome-container">
      <h1>Welcome to the Vehicle Management System</h1>
      <p>
        Manage your vehicles efficiently with our easy-to-use system. 
        You can add, update, delete, and view all your vehicles with just a few clicks.
      </p>
      <div className="button-group">
       
        <Link to="/cars" className="btn btn-primary">View Vehicles</Link>
      </div>
    </div>
  );
};

export default Welcome;