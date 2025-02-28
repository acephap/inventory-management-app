// frontend/src/App.js

import React, { useState } from 'react';
import './App.css';
import InventoryList from './InventoryList';
import AddInventoryItem from './AddInventoryItem';

function App() {

  // Hold inventory in state so we can update it after adding a new item
  const [inventory, setInventory] = useState([]);

  // This callback will be passed to AddInventoryItem so it can update the list
  const handleAddItem = (newItem) => {
    setInventory(prevItems => [...prevItems, newItem]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Inventory Management App</h1>
      </header>
      <main>
        <AddInventoryItem onAdd={handleAddItem} />
        <InventoryList inventory={inventory} setInventory={setInventory} />
      </main>
    </div>
  );
}

export default App;
