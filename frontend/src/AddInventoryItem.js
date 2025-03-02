// frontend/src/AddInventoryItem.js

import React, { useState } from 'react';

/**
 * AddInventoryItem Component
 * Renders a form to add a new inventory item.
 * 
 * Props:
 * - onAdd: Callback function to update the inventory list after adding a new item.
 * - projectId: The ID of the selected project to which the item belongs.
 */
const AddInventoryItem = ({ onAdd, projectId }) => {
  // State for the item name and quantity
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  /**
   * handleSubmit
   * Handles form submission by performing basic validation, creating a new inventory item
   * (including associating it with the current project), sending a POST request to the backend,
   * and then calling the onAdd callback to update the inventory list.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation: ensure both name and quantity are provided
    if (!name || !quantity) {
      alert('Please provide both name and quantity.');
      return;
    }

    // Create a new item object with the project association
    const newItem = {
      name,
      quantity: Number(quantity),
      project: projectId // Associate item with the selected project
    };

    // Send POST request to add the new inventory item under the selected project
    fetch(`/api/projects/${projectId}/inventory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add item');
        }
        return response.json();
      })
      .then(data => {
        // Call the onAdd callback to update the inventory list with the new item
        onAdd(data);
        // Reset form fields
        setName('');
        setQuantity('');
      })
      .catch(error => {
        console.error('Error adding item:', error);
      });
  };

  // Render the form for adding a new inventory item
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Inventory Item</h2>
      <div>
        <label>Name: </label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter item name" 
          required
        />
      </div>
      <div>
        <label>Quantity: </label>
        <input 
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          placeholder="Enter quantity" 
          required
        />
      </div>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddInventoryItem;
