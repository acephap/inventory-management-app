// frontend/src/AddInventoryItem.js
import React, { useState } from 'react';

const AddInventoryItem = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !quantity) {
      alert('Please provide both name and quantity.');
      return;
    }

    // Create a new item object
    const newItem = {
      name,
      quantity: Number(quantity)
    };

    // Send POST request to the backend
    fetch('/api/inventory', {
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
        // Optionally, use a callback to update the inventory list
        onAdd(data);
        setName('');
        setQuantity('');
      })
      .catch(error => {
        console.error('Error adding item:', error);
      });
  };

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
        />
      </div>
      <div>
        <label>Quantity: </label>
        <input 
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          placeholder="Enter quantity" 
        />
      </div>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddInventoryItem;
