// frontend/src/InventoryList.js

import React, { useEffect, useState } from 'react';

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch inventory data from the backend API
    fetch('/api/inventory')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched data:", data); // <-- Add this line
        setInventory(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching inventory:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading inventory...</p>;
  }

  return (
    <div>
      <h2>Inventory List</h2>
      <ul>
        {inventory.map(item => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;
