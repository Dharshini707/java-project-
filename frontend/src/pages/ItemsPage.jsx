import { useState, useEffect } from 'react';
import ItemList from '../components/items/ItemList';
import ItemForm from '../components/items/ItemForm';
import itemService from '../services/itemService';

function ItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await itemService.getAllItems();
      setItems(data);
    } catch {
      setError('Failed to load items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    fetchItems();
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const handleCreate = async (itemData) => {
    try {
      await itemService.createItem(itemData);
      fetchItems();
      setShowForm(false);
    } catch {
      setError('Failed to create item.');
    }
  };

  const handleUpdate = async (id, itemData) => {
    try {
      await itemService.updateItem(id, itemData);
      fetchItems();
      setEditItem(null);
      setShowForm(false);
    } catch {
      setError('Failed to update item.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await itemService.deleteItem(id);
      fetchItems();
    } catch {
      setError('Failed to delete item.');
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditItem(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Items Management</h2>
        <button
          onClick={() => setShowForm(true)}
          style={styles.addButton}
        >
          + Add Item
        </button>
      </div>

      {error && (
        <div style={styles.error}>{error}</div>
      )}

      {showForm && (
        <ItemForm
          key={editItem?.id || 'new'}
          editItem={editItem}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onClose={handleFormClose}
        />
      )}

      {loading ? (
        <p>Loading items...</p>
      ) : (
        <ItemList
          items={items}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

const styles = {
  addButton: {
    backgroundColor: '#4CAF50',
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

export default ItemsPage;