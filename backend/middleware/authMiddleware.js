// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

/**
 * Authentication middleware to verify JWT tokens.
 * It checks the Authorization header for a Bearer token,
 * verifies it using the jwtSecret, and attaches the decoded
 * user object to req.user if valid.
 */
const authMiddleware = (req, res, next) => {
  // Get the Authorization header value (expected format: "Bearer <token>")
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  // Split the header to get the token
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token format invalid' });
  }
  
  // Verify the token
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    // Attach the decoded token (user data) to the request object
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
