// frontend/src/Register.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

/**
 * Register Component
 * Renders a form for new users to register.
 * On form submission, it sends a POST request to the /api/auth/register endpoint.
 * If registration is successful, it navigates the user to the login page.
 */
const Register = () => {
  // Form state variables to store input values
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('manager'); // Default role set to 'manager'
  const [error, setError] = useState('');
  
  // useNavigate hook to programmatically navigate to other routes
  const navigate = useNavigate();

  /**
   * handleSubmit - Handles the registration form submission.
   * Prevents the default form action, creates a user data object,
   * sends it to the backend, and navigates to the login page if successful.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    // Construct the user data payload from the state variables
    const userData = { username, email, password, role };

    // Send a POST request to the registration endpoint
    fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(data => {
        // If the API returns an error, update the error state
        if (data.error) {
          setError(data.error);
        } else {
          // On successful registration, navigate to the login page
          navigate('/login');
        }
      })
      .catch(err => {
        console.error('Registration error:', err);
        setError('Registration failed. Please try again.');
      });
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {/* Display error message if registration fails */}
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit} className="auth-form">
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        {/* Role selection for the new user */}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="manager">Manager</option>
          <option value="accountant">Accountant</option>
          <option value="data-manager">Data Manager</option>
          <option value="logistic-officer">Logistic Officer</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
