import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="illustration-section">
        <img 
          src="https://img.freepik.com/free-vector/mobile-ux-concept-illustration_114360-4977.jpg?t=st=1731238234~exp=1731241834~hmac=2aca3f2bd382c0326268d7e845b34a2e9a69a73b52f221694af7507c7a5aa4ff&w=740" 
          alt="Notes App Illustration" 
          className="illustration-image"
        />
      </div>
      <div className="welcome-section">
        <h1>Welcome to the Todo App</h1>
        <p>Organize your day to day tasks in one place with ease.</p>
        <div className="button-group">
          <Link to="/register" className="button register-button">Register</Link>
          <Link to="/login" className="button login-button">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
