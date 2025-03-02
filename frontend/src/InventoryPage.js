// frontend/src/InventoryPage.js

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AddInventoryItem from './AddInventoryItem';
import InventoryList from './InventoryList';

const InventoryPage = () => {
  const { projectId } = useParams();
  const [inventory, setInventory] = useState([]);

  return (
    <div>
      <h2>Project Inventory</h2>
      {/* Link back to the projects list */}
      <Link to="/">Back to Projects</Link>
      <AddInventoryItem 
        onAdd={(item) => setInventory(prev => [...prev, item])} 
        projectId={projectId} 
      />
      <InventoryList 
        inventory={inventory} 
        setInventory={setInventory} 
        projectId={projectId} 
      />
    </div>
  );
};

export default InventoryPage;
