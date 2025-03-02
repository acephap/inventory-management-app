// frontend/src/Projects.js

import React, { useEffect, useState } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  // Fetch projects from backend when the component mounts
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

    fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData)
    })
      .then(response => response.json())
      .then(data => {
        setProjects(prevProjects => [...prevProjects, data]);
        setNewProjectName('');
        setNewProjectDescription('');
      })
      .catch(error => {
        console.error('Error adding project:', error);
      });
  };

  if (loading) {
    return <p>Loading projects...</p>;
  }

  return (
    <div>
      <h2>Projects</h2>
      <form onSubmit={handleAddProject}>
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
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
