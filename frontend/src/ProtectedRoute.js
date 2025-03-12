// frontend/src/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
// Correct import of jwt-decode (default export)
import { decode } from 'jwt-decode';

/**
 * ProtectedRoute Component
 * - Wraps around routes that require authentication.
 * - If allowedRoles is provided, it also checks whether the user’s role is permitted.
 *
 * Props:
 * - children: The component(s) to render if access is allowed.
 * - allowedRoles: Optional array of roles that are allowed to access this route.
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');

  // If no token is found, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles is specified, decode the token and check the user's role
  if (allowedRoles && allowedRoles.length > 0) {
    try {
      const decoded = jwt_decode(token); // Correct usage of jwt_decode
      const userRole = decoded.role;
      // If the user's role is not allowed, redirect to the unauthorized page
      if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
      }
    } catch (error) {
      console.error('Token decode failed:', error);
      return <Navigate to="/login" replace />;
    }
  }

  // If token exists (and role is allowed, if applicable), render the children components
  return children;
};

export default ProtectedRoute;
