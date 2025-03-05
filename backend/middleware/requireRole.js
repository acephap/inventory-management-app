// backend/middleware/requireRole.js

/**
 * Middleware to check if the authenticated user has the required role.
 * @param {string} role - The required role (e.g., 'manager', 'accountant').
 */
const requireRole = (role) => {
    return (req, res, next) => {
      // Ensure that the user is authenticated and has a role
      if (!req.user || req.user.role !== role) {
        return res.status(403).json({ error: 'Access forbidden: insufficient permissions' });
      }
      next();
    };
  };
  
  module.exports = requireRole;
  