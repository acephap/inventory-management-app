// frontend/src/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // Form state for login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle login form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const credentials = { username, password };

    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else if (data.token) {
          // Store token in localStorage (or context/state as needed)
          localStorage.setItem('token', data.token);
          // Navigate to the Projects page after successful login
          navigate('/');
        }
      })
      .catch(err => {
        console.error('Login error:', err);
        setError('Login failed. Please try again.');
      });
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
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
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
