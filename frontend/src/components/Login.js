import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import '../styles/Register.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('All fields are required');
      return;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const userData = { email, password };

    try {
      const response = await loginUser(userData);

      if (response.token) {
        localStorage.setItem('token', response.token);
        setSuccessMessage('Login successful!');
        setError('');
        setEmail('');
        setPassword('');

        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        setError('Login failed. Please try again.');
      }

    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          if (err.response.data.message === 'Invalid email') {
            setError('Email does not exist');
          } else if (err.response.data.message === 'Invalid password') {
            setError('Incorrect password');
          } else {
            setError('Invalid email or password');
          }
        } else if (err.response.status === 500) {
          setError('Server error. Please try again later');
        } else {
          setError('An unexpected error occurred. Please try again');
        }
      } else {
        setError('Network error. Please check your connection');
      }
      setSuccessMessage('');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Login to Your Account</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              minLength="6"
            />
          </div>
          <button type="submit" className="register-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
