// frontend/src/InventoryList.js

import React, { useEffect, useState } from 'react';

const InventoryList = ({ inventory, setInventory, projectId }) => {
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for the search term entered by the user
  const [searchTerm, setSearchTerm] = useState('');
  // State for sorting: sort field ('name' or 'quantity') and sort order ('asc' or 'desc')
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Fetch inventory for the selected project only
  useEffect(() => {
    // If no project is selected, do not fetch inventory and set loading to false
    if (!projectId) {
      setLoading(false);
      return;
    }
    // Fetch inventory data from the backend for the given projectId
    fetch(`/api/projects/${projectId}/inventory`)
      .then(response => response.json())
      .then(data => {
        setInventory(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching inventory:', error);
        setLoading(false);
      });
  }, [projectId, setInventory]);

  // Debugging: log search term and filtered items when they change
  useEffect(() => {
    const debugFiltered = inventory.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log("Search term:", searchTerm);
    console.log("Filtered items:", debugFiltered);
  }, [searchTerm, inventory]);

  // Function to handle deleting an item
  const handleDelete = (id) => {
    fetch(`/api/inventory/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(() => {
        setInventory(prev => prev.filter(item => item._id !== id));
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  // Function to handle editing an item
  const handleEdit = (id) => {
    const newName = prompt("Enter the new name:");
    const newQuantity = prompt("Enter the new quantity:");
    if (newName && newQuantity) {
      const updatedItem = { name: newName, quantity: Number(newQuantity) };
      fetch(`/api/inventory/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem)
      })
        .then(response => response.json())
        .then(updatedData => {
          setInventory(prev =>
            prev.map(item => (item._id === id ? updatedData : item))
          );
        })
        .catch(error => console.error('Error updating item:', error));
    }
  };

  // Filter inventory items based on the search term (case-insensitive)
  const filteredItems = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort the filtered items based on the selected sort field and order
  const sortedItems = filteredItems.slice().sort((a, b) => {
    if (sortBy === 'name') {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return sortOrder === 'asc' ? -1 : 1;
      if (nameA > nameB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    } else if (sortBy === 'quantity') {
      return sortOrder === 'asc' ? a.quantity - b.quantity : b.quantity - a.quantity;
    }
    return 0;
  });

  // Display a loading message while fetching inventory data
  if (loading) {
    return <p>Loading inventory...</p>;
  }

  // If no project is selected, display a prompt to select a project
  if (!projectId) {
    return <p>Please select a project to view its inventory.</p>;
  }

  // Render the inventory UI
  return (
    <div className="inventory-container">
      <h2>Inventory List</h2>
      {/* Search input to filter inventory items */}
      <input
        type="text"
        placeholder="Search inventory..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {/* Display a message if search yields no matching items */}
      {filteredItems.length === 0 && searchTerm && (
        <p>No items match your search.</p>
      )}
      {/* Sorting controls */}
      <div className="sort-controls">
        <label>Sort By: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="quantity">Quantity</option>
        </select>
        <button onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}>
          {sortOrder === 'asc' ? 'Asc' : 'Desc'}
        </button>
      </div>
      {/* Display inventory items in a grid layout */}
      <div className="inventory-grid">
        {sortedItems.map((item, index) => (
          <div key={`${item._id}-${index}`} className="inventory-card">
            <h3>{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleEdit(item._id)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryList;
