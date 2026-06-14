import { useState } from 'react';

function BOMForm({ editBOM, items, onCreate, onUpdate, onClose }) {

  const [formData, setFormData] = useState({
    parentItemId:     editBOM?.parentItem?.id     || '',
    childItemId:      editBOM?.childItem?.id      || '',
    quantityRequired: editBOM?.quantityRequired   || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.parentItemId)
      newErrors.parentItemId = 'Parent item is required.';
    if (!formData.childItemId)
      newErrors.childItemId = 'Child item is required.';
    if (formData.parentItemId && formData.childItemId &&
        formData.parentItemId === formData.childItemId)
      newErrors.childItemId = 'Parent and child cannot be the same item.';
    if (!formData.quantityRequired || Number(formData.quantityRequired) <= 0)
      newErrors.quantityRequired = 'Quantity must be greater than 0.';
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
      parentItemId:     Number(formData.parentItemId),
      childItemId:      Number(formData.childItemId),
      quantityRequired: Number(formData.quantityRequired),
    };
    if (editBOM) {
      onUpdate(editBOM.id, payload);
    } else {
      onCreate(payload);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>

        {/* Header */}
        <div style={styles.header}>
          <h3 style={{ margin: 0 }}>
            {editBOM ? 'Edit BOM Link' : 'Add BOM Link'}
          </h3>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        {/* Info note */}
        <div style={styles.infoBox}>
          💡 A BOM link connects a <strong>Parent</strong> item to a
          <strong> Child</strong> item with the quantity needed to build one
          unit of the parent.
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>

          {/* Parent Item */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Parent Item *</label>
            <select
              name="parentItemId"
              value={formData.parentItemId}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.parentItemId ? styles.inputError : {}),
              }}
            >
              <option value="">-- Select Parent Item --</option>
              {items.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.itemCode}) — {item.type}
                </option>
              ))}
            </select>
            {errors.parentItemId &&
              <span style={styles.errorText}>{errors.parentItemId}</span>}
          </div>

          {/* Child Item */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Child Item *</label>
            <select
              name="childItemId"
              value={formData.childItemId}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.childItemId ? styles.inputError : {}),
              }}
            >
              <option value="">-- Select Child Item --</option>
              {items.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.itemCode}) — {item.type}
                </option>
              ))}
            </select>
            {errors.childItemId &&
              <span style={styles.errorText}>{errors.childItemId}</span>}
          </div>

          {/* Quantity Required */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Quantity Required *</label>
            <input
              type="number"
              name="quantityRequired"
              value={formData.quantityRequired}
              onChange={handleChange}
              placeholder="e.g. 2"
              min="0.01"
              step="0.01"
              style={{
                ...styles.input,
                ...(errors.quantityRequired ? styles.inputError : {}),
              }}
            />
            {errors.quantityRequired &&
              <span style={styles.errorText}>{errors.quantityRequired}</span>}
          </div>

          {/* Buttons */}
          <div style={styles.buttonRow}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" style={styles.submitBtn}>
              {editBOM ? 'Update BOM Link' : 'Create BOM Link'}
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
    width: '500px',
    maxWidth: '95vw',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1565C0',
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
  infoBox: {
    backgroundColor: '#E3F2FD',
    color: '#1565C0',
    padding: '10px 20px',
    fontSize: '13px',
    borderBottom: '1px solid #BBDEFB',
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
  errorText: {
    color: '#D32F2F',
    fontSize: '12px',
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
    backgroundColor: '#1565C0',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
  },
};

export default BOMForm;