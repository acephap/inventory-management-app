// frontend/src/SignOut.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * SignOut Component
 * When this component mounts, it removes the authentication token
 * from localStorage and redirects the user to the login page.
 */
const SignOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Optionally, you might clear other user-related data here

    // Redirect to the login page
    navigate('/login');
  }, [navigate]);

  return (
    <div className="signout-container">
      <h2>Signing Out...</h2>
      <p>Please wait while we log you out.</p>
    </div>
  );
};

export default SignOut;
