import { useState, useEffect } from 'react';
import InventoryList from '../components/inventory/InventoryList';
import InventoryForm from '../components/inventory/InventoryForm';
import inventoryService from '../services/inventoryService';
import itemService from '../services/itemService';

function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editInventory, setEditInventory] = useState(null);

  const fetchInventory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await inventoryService.getAllInventory();
      setInventory(data);
    } catch {
      setError('Failed to load inventory.');
    } finally {
      setLoading(false);
    }
  };

  const fetchItems = async () => {
    try {
      const data = await itemService.getAllItems();
      setItems(data);
    } catch {
      setError('Failed to load items.');
    }
  };

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    fetchInventory();
    fetchItems();
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const handleCreate = async (inventoryData) => {
    try {
      await inventoryService.createInventory(inventoryData);
      fetchInventory();
      setShowForm(false);
    } catch {
      setError('Failed to create inventory record.');
    }
  };

  const handleUpdate = async (itemId, inventoryData) => {
    try {
      await inventoryService.updateInventory(itemId, inventoryData);
      fetchInventory();
      setEditInventory(null);
      setShowForm(false);
    } catch {
      setError('Failed to update inventory.');
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm('Delete this inventory record?')) return;
    try {
      await inventoryService.deleteInventory(itemId);
      fetchInventory();
    } catch {
      setError('Failed to delete inventory record.');
    }
  };

  const handleEdit = (inv) => {
    setEditInventory(inv);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditInventory(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Inventory Management</h2>
        <button
          onClick={() => setShowForm(true)}
          style={styles.addButton}
        >
          + Add Inventory
        </button>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {showForm && (
        <InventoryForm
          key={editInventory?.item?.id || 'new'}
          editInventory={editInventory}
          items={items}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onClose={handleFormClose}
        />
      )}

      {loading ? (
        <p>Loading inventory...</p>
      ) : (
        <InventoryList
          inventory={inventory}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

const styles = {
  addButton: {
    backgroundColor: '#F57C00',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '15px',
  },
};

export default InventoryPage;