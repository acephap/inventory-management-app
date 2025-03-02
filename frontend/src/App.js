// frontend/src/App.js

import React, { useState } from 'react';
import './App.css';
import InventoryList from './InventoryList';
import AddInventoryItem from './AddInventoryItem';
import Projects from './Projects';

function App() {
  const [inventory, setInventory] = useState([]);
  const [theme, setTheme] = useState(''); // For theming, if implemented

  const handleAddItem = (newItem) => {
    setInventory(prevItems => [...prevItems, newItem]);
  };

  // Toggle theme (if using theming)
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? '' : 'dark'));
  };

  return (
    <div className={`App ${theme}`}>
      <header className="App-header">
        <h1>Inventory Management App</h1>
        <button onClick={toggleTheme}>
          Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </button>
      </header>
      <main>
        {/* Render Projects Component */}
        <Projects />
        {/* Render Inventory Management Components */}
        <AddInventoryItem onAdd={handleAddItem} />
        <InventoryList inventory={inventory} setInventory={setInventory} />
      </main>
    </div>
  );
}

export default App;
