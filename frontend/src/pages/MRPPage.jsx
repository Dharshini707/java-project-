import { useState, useEffect } from 'react';
import MRPInputForm from '../components/mrp/MRPInputForm';
import MRPResultTable from '../components/mrp/MRPResultTable';
import PurchaseOrderList from '../components/mrp/PurchaseOrderList';
import mrpService from '../services/mrpService';
import itemService from '../services/itemService';

function MRPPage() {
  const [mrpResults, setMrpResults] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [poLoading, setPoLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasExploded, setHasExploded] = useState(false);

  const fetchItems = async () => {
    try {
      const data = await itemService.getAllItems();
      setItems(data);
    } catch {
      setError('Failed to load items.');
    }
  };

  const fetchPurchaseOrders = async () => {
    setPoLoading(true);
    try {
      const data = await mrpService.getPurchaseOrders();
      setPurchaseOrders(data);
    } catch {
      setError('Failed to load purchase orders.');
    } finally {
      setPoLoading(false);
    }
  };

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    fetchItems();
    fetchPurchaseOrders();
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const handleExplode = async (productId, targetQuantity) => {
    setLoading(true);
    setError(null);
    setHasExploded(false);
    try {
      const data = await mrpService.explodeBOM(productId, targetQuantity);
      setMrpResults(data);
      setHasExploded(true);
      fetchPurchaseOrders();
    } catch {
      setError('MRP explosion failed. Check product and quantity.');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveOrder = async (poId) => {
    try {
      await mrpService.approvePurchaseOrder(poId);
      fetchPurchaseOrders();
    } catch {
      setError('Failed to approve purchase order.');
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>MRP Engine — BOM Explosion</h2>

      {error && <div style={styles.error}>{error}</div>}

      {/* Input Form */}
      <MRPInputForm
        items={items}
        onExplode={handleExplode}
        loading={loading}
      />

      {/* MRP Result Table */}
      {hasExploded && (
        <div style={{ marginTop: '30px' }}>
          <h3>Net Requirements Result</h3>
          {loading ? (
            <p>Running MRP explosion...</p>
          ) : (
            <MRPResultTable results={mrpResults} />
          )}
        </div>
      )}

      {/* Purchase Orders */}
      <div style={{ marginTop: '40px' }}>
        <h3>Auto-Generated Purchase Orders</h3>
        {poLoading ? (
          <p>Loading purchase orders...</p>
        ) : (
          <PurchaseOrderList
            purchaseOrders={purchaseOrders}
            onApprove={handleApproveOrder}
          />
        )}
      </div>
    </div>
  );
}

const styles = {
  error: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '15px',
  },
};

export default MRPPage;