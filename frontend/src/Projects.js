// frontend/src/Projects.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Projects Component
 * - Fetches and displays a list of projects from the backend.
 * - Provides a form to add a new project.
 * - Navigates to the Inventory page when a project is clicked.
 */
const Projects = () => {
  // State for storing the list of projects
  const [projects, setProjects] = useState([]);
  // Loading state for when projects are being fetched
  const [loading, setLoading] = useState(true);
  // State for the new project's name
  const [newProjectName, setNewProjectName] = useState('');
  // State for the new project's description
  const [newProjectDescription, setNewProjectDescription] = useState('');
  
  // useNavigate hook from react-router-dom for navigation
  const navigate = useNavigate();

  // Fetch projects from the backend when the component mounts
  useEffect(() => {
    fetch('/api/projects')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        setLoading(false);
      });
  }, []);

  // Handler for adding a new project
  const handleAddProject = (e) => {
    e.preventDefault();
    const projectData = {
      name: newProjectName,
      description: newProjectDescription
    };

    // Send a POST request to add a new project
    fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData)
    })
      .then(response => response.json())
      .then(data => {
        // Append the newly added project to the existing list
        setProjects(prev => [...prev, data]);
        // Reset the input fields
        setNewProjectName('');
        setNewProjectDescription('');
      })
      .catch(error => {
        console.error('Error adding project:', error);
      });
  };

  // If projects are still loading, display a loading message
  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="projects-container">
      <h2>Projects</h2>
      {/* Form for adding a new project */}
      <form onSubmit={handleAddProject} className="projects-form">
        <input
          type="text"
          placeholder="Project Name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          required
        />
        <textarea
          placeholder="Project Description"
          value={newProjectDescription}
          onChange={(e) => setNewProjectDescription(e.target.value)}
        />
        <button type="submit">Add Project</button>
      </form>
      {/* List of projects */}
      <ul className="projects-list">
        {projects.map(project => (
          <li
            key={project._id}
            // When a project is clicked, navigate to its inventory page using its _id
            onClick={() => navigate(`/project/${project._id}`)}
            style={{
              cursor: 'pointer',
              marginBottom: '10px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
