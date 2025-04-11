// backend/middleware/checkProjectAccess.js

/**
 * checkProjectAccess middleware
 * 
 * Verifies that the authenticated user has access to the requested project.
 * Assumes that:
 *   - Your authentication middleware populates req.user with user data (including project).
 *   - The project ID is provided in the URL as req.params.projectId.
 *
 * If the user’s project does not match, a 403 Forbidden response is sent.
 */
module.exports = (req, res, next) => {
    // Get the project ID from the request parameters
    const requestedProjectId = req.params.projectId;
    
    // Ensure req.user is available (populated by authentication middleware)
    if (!req.user || !req.user.project) {
      return res.status(401).json({ error: 'Unauthorized: User data not found.' });
    }
    
    // Compare the user's project with the requested project
    // If a user can have multiple projects, adjust this logic accordingly.
    if (req.user.project.toString() !== requestedProjectId) {
      return res.status(403).json({ error: 'Access denied: You do not have access to this project.' });
    }
    
    // If the user is allowed, proceed to the next middleware or route handler
    next();
  };
  