import { useState } from 'react';

function MRPInputForm({ items, onExplode, loading }) {

  const [formData, setFormData] = useState({
    productId:      '',
    targetQuantity: '',
  });

  const [errors, setErrors]         = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  // Only show Finished Goods in dropdown
  const finishedGoods = items.filter(item => item.type === 'FINISHED_GOOD');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'productId') {
      const found = finishedGoods.find(i => String(i.id) === String(value));
      setSelectedItem(found || null);
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.productId)
      newErrors.productId = 'Please select a finished good.';
    if (!formData.targetQuantity || Number(formData.targetQuantity) <= 0)
      newErrors.targetQuantity = 'Quantity must be greater than 0.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onExplode(Number(formData.productId), Number(formData.targetQuantity));
  };

  return (
    <div style={styles.card}>

      {/* Card Header */}
      <div style={styles.cardHeader}>
        <span style={styles.headerIcon}>⚙️</span>
        <div>
          <h3 style={styles.cardTitle}>Run MRP Explosion</h3>
          <p style={styles.cardSubtitle}>
            Select a finished good and enter production quantity to
            calculate all raw material requirements.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>

        <div style={styles.row}>

          {/* Product selector */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Finished Good *</label>
            <select
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.productId ? styles.inputError : {}),
              }}
            >
              <option value="">-- Select Product --</option>
              {finishedGoods.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.itemCode})
                </option>
              ))}
            </select>
            {errors.productId &&
              <span style={styles.errorText}>{errors.productId}</span>}
          </div>

          {/* Target Quantity */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Production Quantity *</label>
            <input
              type="number"
              name="targetQuantity"
              value={formData.targetQuantity}
              onChange={handleChange}
              placeholder="e.g. 500"
              min="1"
              step="1"
              style={{
                ...styles.input,
                ...(errors.targetQuantity ? styles.inputError : {}),
              }}
            />
            {errors.targetQuantity &&
              <span style={styles.errorText}>{errors.targetQuantity}</span>}
          </div>

          {/* Explode Button */}
          <div style={styles.btnGroup}>
            <label style={{ ...styles.label, visibility: 'hidden' }}>
              Run
            </label>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.explodeBtn,
                ...(loading ? styles.explodeBtnDisabled : {}),
              }}
            >
              {loading ? '⏳ Running...' : '🚀 Explode BOM'}
            </button>
          </div>

        </div>

        {/* Selected product preview */}
        {selectedItem && (
          <div style={styles.previewBox}>
            <span style={styles.previewLabel}>Selected:</span>
            <strong>{selectedItem.name}</strong>
            <span style={styles.previewCode}>{selectedItem.itemCode}</span>
            {formData.targetQuantity && (
              <span style={styles.previewQty}>
                → Producing {formData.targetQuantity} units
              </span>
            )}
          </div>
        )}

      </form>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    border: '1px solid #e0e0e0',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  cardHeader: {
    backgroundColor: '#1A237E',
    color: 'white',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  headerIcon: {
    fontSize: '28px',
  },
  cardTitle: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '700',
  },
  cardSubtitle: {
    margin: '4px 0 0 0',
    fontSize: '13px',
    opacity: 0.85,
  },
  form: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  row: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1,
    minWidth: '200px',
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    minWidth: '160px',
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
    height: '42px',
  },
  inputError: {
    border: '1px solid #D32F2F',
    backgroundColor: '#fff8f8',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: '12px',
  },
  explodeBtn: {
    height: '42px',
    backgroundColor: '#1A237E',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '700',
    letterSpacing: '0.3px',
  },
  explodeBtnDisabled: {
    backgroundColor: '#9FA8DA',
    cursor: 'not-allowed',
  },
  previewBox: {
    backgroundColor: '#E8EAF6',
    border: '1px solid #C5CAE9',
    borderRadius: '6px',
    padding: '10px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    fontSize: '13px',
    color: '#1A237E',
  },
  previewLabel: {
    fontWeight: '600',
    color: '#5C6BC0',
  },
  previewCode: {
    backgroundColor: '#C5CAE9',
    padding: '2px 8px',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '12px',
  },
  previewQty: {
    marginLeft: 'auto',
    fontWeight: '700',
    color: '#1A237E',
  },
};

export default MRPInputForm;