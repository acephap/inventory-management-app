// frontend/src/App.js

import React from 'react';
import './App.css';
import InventoryList from './InventoryList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Inventory Management App</h1>
      </header>
      <main>
        <InventoryList />
      </main>
    </div>
  );
}

export default App;
