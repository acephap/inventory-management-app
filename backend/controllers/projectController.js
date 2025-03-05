// backend/controllers/projectController.js

const Project = require('../models/Project');

/**
 * Get all projects.
 * Retrieves all projects from the database and returns them as JSON.
 */
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

/**
 * Create a new project.
 * Creates a new project from the request body, saves it to the database,
 * emits a real-time event for project creation, and returns the saved project.
 */
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newProject = new Project({ name, description });
    const savedProject = await newProject.save();
    // Emit real-time event indicating a project was created
    global.io.emit('projectUpdated', { action: 'create', project: savedProject });
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project' });
  }
};

/**
 * Update an existing project.
 * Finds a project by its id and updates it with the request body.
 * Emits a real-time event for project update if successful.
 */
exports.updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedProject) {
      // Emit real-time event indicating a project was updated
      global.io.emit('projectUpdated', { action: 'update', project: updatedProject });
      res.json(updatedProject);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

/**
 * Delete a project.
 * Finds a project by its id and deletes it from the database.
 * Emits a real-time event for project deletion if successful.
 */
exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (deletedProject) {
      // Emit real-time event indicating a project was deleted
      global.io.emit('projectUpdated', { action: 'delete', project: deletedProject });
      res.json(deletedProject);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};
