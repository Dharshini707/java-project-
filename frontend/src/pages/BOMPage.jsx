import { useState, useEffect } from 'react';
import BOMList from '../components/bom/BOMList';
import BOMForm from '../components/bom/BOMForm';
import BOMTree from '../components/bom/BOMTree';
import bomService from '../services/bomService';
import itemService from '../services/itemService';

function BOMPage() {
  const [bomLinks, setBomLinks] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editBOM, setEditBOM] = useState(null);
  const [activeTab, setActiveTab] = useState('list');

  const fetchBOMLinks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bomService.getAllBOMLinks();
      setBomLinks(data);
    } catch (error) {
      console.error(error);
      setError('Failed to load BOM links.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [bomData, itemsData] = await Promise.all([
          bomService.getAllBOMLinks(),
          itemService.getAllItems(),
        ]);

        setBomLinks(bomData);
        setItems(itemsData);
      } catch (error) {
        console.error(error);
        setError('Failed to load BOM data.');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);


  const handleCreate = async (bomData) => {
    try {
      await bomService.createBOMLink(bomData);
      fetchBOMLinks();
      setShowForm(false);
    } catch (error) {
      console.error(error);
      setError('Failed to create BOM link.');
    }
  };

  const handleUpdate = async (id, bomData) => {
    try {
      await bomService.updateBOMLink(id, bomData);
      fetchBOMLinks();
      setEditBOM(null);
      setShowForm(false);
    } catch (error) {
      console.error(error);
      setError('Failed to update BOM link.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this BOM link?')) return;
    try {
      await bomService.deleteBOMLink(id);
      fetchBOMLinks();
    } catch (error) {
      console.error(error);
      setError('Failed to delete BOM link.');
    }
  };

  const handleEdit = (bom) => {
    setEditBOM(bom);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditBOM(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Bill of Materials (BOM)</h2>
        <button
          onClick={() => setShowForm(true)}
          style={styles.addButton}
        >
          + Add BOM Link
        </button>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {showForm && (
        <BOMForm
          key={editBOM?.id || 'new'}
          editBOM={editBOM}
          items={items}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onClose={handleFormClose}
        />
      )}

      {/* Tab switcher */}
      <div style={styles.tabContainer}>
        <button
          style={activeTab === 'list' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('list')}
        >
          List View
        </button>
        <button
          style={activeTab === 'tree' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('tree')}
        >
          Tree View
        </button>
      </div>

      {loading ? (
        <p>Loading BOM...</p>
      ) : (
        <>
          {activeTab === 'list' && (
            <BOMList
              bomLinks={bomLinks}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
          {activeTab === 'tree' && (
            <BOMTree bomLinks={bomLinks} items={items} />
          )}
        </>
      )}
    </div>
  );
}

const styles = {
  addButton: {
    backgroundColor: '#1976D2',
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
  tabContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  tab: {
    padding: '8px 20px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    cursor: 'pointer',
    backgroundColor: 'white',
    fontSize: '14px',
  },
  activeTab: {
    padding: '8px 20px',
    border: '1px solid #1976D2',
    borderRadius: '6px',
    cursor: 'pointer',
    backgroundColor: '#1976D2',
    color: 'white',
    fontSize: '14px',
  },
};

export default BOMPage;