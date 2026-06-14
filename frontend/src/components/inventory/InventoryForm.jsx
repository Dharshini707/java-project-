import { useState } from 'react';

function InventoryForm({ editInventory, items, onCreate, onUpdate, onClose }) {

  const [formData, setFormData] = useState({
    itemId:         editInventory?.item?.id       || '',
    quantityOnHand: editInventory?.quantityOnHand || '',
  });

  const [errors, setErrors]   = useState({});
  const [selectedItem, setSelectedItem] = useState(editInventory?.item || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Show selected item details
    if (name === 'itemId') {
      const found = items.find(i => String(i.id) === String(value));
      setSelectedItem(found || null);
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.itemId)
      newErrors.itemId = 'Please select an item.';
    if (formData.quantityOnHand === '' || Number(formData.quantityOnHand) < 0)
      newErrors.quantityOnHand = 'Quantity must be 0 or greater.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const payload = {
      itemId:         Number(formData.itemId),
      quantityOnHand: Number(formData.quantityOnHand),
    };
    if (editInventory) {
      onUpdate(formData.itemId, payload);
    } else {
      onCreate(payload);
    }
  };

  const getStockStatusColor = (qty) => {
    if (qty <= 0)  return '#C62828';
    if (qty <= 10) return '#E65100';
    if (qty <= 50) return '#F57F17';
    return '#2E7D32';
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>

        {/* Header */}
        <div style={styles.header}>
          <h3 style={{ margin: 0 }}>
            {editInventory ? 'Update Inventory' : 'Add Inventory Record'}
          </h3>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>

          {/* Item Selector */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Select Item *</label>
            <select
              name="itemId"
              value={formData.itemId}
              onChange={handleChange}
              disabled={!!editInventory}
              style={{
                ...styles.input,
                ...(errors.itemId ? styles.inputError : {}),
                ...(editInventory ? styles.inputDisabled : {}),
              }}
            >
              <option value="">-- Select Item --</option>
              {items.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.itemCode}) — {item.type}
                </option>
              ))}
            </select>
            {errors.itemId &&
              <span style={styles.errorText}>{errors.itemId}</span>}
          </div>

          {/* Selected item preview */}
          {selectedItem && (
            <div style={styles.previewBox}>
              <p style={styles.previewRow}>
                <span style={styles.previewLabel}>Name:</span>
                <strong>{selectedItem.name}</strong>
              </p>
              <p style={styles.previewRow}>
                <span style={styles.previewLabel}>Code:</span>
                {selectedItem.itemCode}
              </p>
              <p style={styles.previewRow}>
                <span style={styles.previewLabel}>Type:</span>
                {selectedItem.type}
              </p>
              <p style={styles.previewRow}>
                <span style={styles.previewLabel}>Unit:</span>
                {selectedItem.unit || '—'}
              </p>
            </div>
          )}

          {/* Quantity On Hand */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Quantity On Hand *</label>
            <input
              type="number"
              name="quantityOnHand"
              value={formData.quantityOnHand}
              onChange={handleChange}
              placeholder="e.g. 100"
              min="0"
              step="1"
              style={{
                ...styles.input,
                ...(errors.quantityOnHand ? styles.inputError : {}),
                ...(formData.quantityOnHand !== ''
                  ? { borderColor: getStockStatusColor(Number(formData.quantityOnHand)) }
                  : {}),
              }}
            />
            {errors.quantityOnHand &&
              <span style={styles.errorText}>{errors.quantityOnHand}</span>}

            {/* Live stock status indicator */}
            {formData.quantityOnHand !== '' && (
              <span style={{
                fontSize: '12px',
                color: getStockStatusColor(Number(formData.quantityOnHand)),
                fontWeight: '600',
                marginTop: '4px',
              }}>
                {Number(formData.quantityOnHand) <= 0  && '⚠ Out of Stock'}
                {Number(formData.quantityOnHand) > 0
                  && Number(formData.quantityOnHand) <= 10  && '⚠ Critical Low'}
                {Number(formData.quantityOnHand) > 10
                  && Number(formData.quantityOnHand) <= 50  && '⚠ Low Stock'}
                {Number(formData.quantityOnHand) > 50  && '✓ In Stock'}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div style={styles.buttonRow}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" style={styles.submitBtn}>
              {editInventory ? 'Update Inventory' : 'Add Inventory'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '10px',
    width: '480px',
    maxWidth: '95vw',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F57C00',
    color: 'white',
    padding: '16px 20px',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
  },
  form: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#444',
  },
  input: {
    padding: '10px 12px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  inputError: {
    border: '1px solid #D32F2F',
    backgroundColor: '#fff8f8',
  },
  inputDisabled: {
    backgroundColor: '#F5F5F5',
    color: '#888',
    cursor: 'not-allowed',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: '12px',
  },
  previewBox: {
    backgroundColor: '#FFF3E0',
    border: '1px solid #FFE0B2',
    borderRadius: '6px',
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  previewRow: {
    margin: 0,
    fontSize: '13px',
    color: '#555',
    display: 'flex',
    gap: '8px',
  },
  previewLabel: {
    fontWeight: '600',
    color: '#E65100',
    minWidth: '50px',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '8px',
  },
  cancelBtn: {
    padding: '10px 20px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '14px',
  },
  submitBtn: {
    padding: '10px 24px',
    backgroundColor: '#F57C00',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
  },
};

export default InventoryForm;