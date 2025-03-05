// frontend/src/InventoryList.js

import React, { useEffect, useState } from 'react';

const InventoryList = ({ inventory, setInventory, projectId }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name' or 'quantity'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  // Fetch inventory for the selected project only
  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      return;
    }
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

  // Filter items based on search term (case-insensitive)
  const filteredItems = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort filtered items based on selected criteria
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

  if (loading) {
    return <p>Loading inventory...</p>;
  }

  // Function to handle deletion of an inventory item
  const handleDelete = (id) => {
    // Use the nested route including the projectId
    fetch(`/api/projects/${projectId}/inventory/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(() => {
        // Remove the deleted item from state
        setInventory(prev => prev.filter(item => item._id !== id));
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  // Function to handle editing an inventory item (if applicable)
  const handleEdit = (id) => {
    const newName = prompt("Enter the new name:");
    const newQuantity = prompt("Enter the new quantity:");
    if (newName && newQuantity) {
      const updatedItem = { name: newName, quantity: Number(newQuantity) };
      // Ensure the URL includes the projectId for update as well
      fetch(`/api/projects/${projectId}/inventory/${id}`, {
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

  return (
    <div className="inventory-container">
      <h2>Inventory List</h2>
      <input
        type="text"
        placeholder="Search inventory..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {filteredItems.length === 0 && searchTerm && (
        <p>No items match your search.</p>
      )}
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
