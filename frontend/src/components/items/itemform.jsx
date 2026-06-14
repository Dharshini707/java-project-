import { useState } from 'react';

function ItemForm({ editItem, onCreate, onUpdate, onClose }) {

  const [formData, setFormData] = useState({
    name:        editItem?.name        || '',
    itemCode:    editItem?.itemCode    || '',
    type:        editItem?.type        || 'RAW_MATERIAL',
    unit:        editItem?.unit        || '',
    description: editItem?.description || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim())     newErrors.name     = 'Item name is required.';
    if (!formData.itemCode.trim()) newErrors.itemCode = 'Item code is required.';
    if (!formData.type)            newErrors.type     = 'Type is required.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (editItem) {
      onUpdate(editItem.id, formData);
    } else {
      onCreate(formData);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>

        {/* Header */}
        <div style={styles.header}>
          <h3 style={{ margin: 0 }}>
            {editItem ? 'Edit Item' : 'Add New Item'}
          </h3>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>

          {/* Item Name */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Item Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Bicycle Frame"
              style={{
                ...styles.input,
                ...(errors.name ? styles.inputError : {}),
              }}
            />
            {errors.name && <span style={styles.errorText}>{errors.name}</span>}
          </div>

          {/* Item Code */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Item Code *</label>
            <input
              type="text"
              name="itemCode"
              value={formData.itemCode}
              onChange={handleChange}
              placeholder="e.g. BIC-FRM-001"
              style={{
                ...styles.input,
                ...(errors.itemCode ? styles.inputError : {}),
              }}
            />
            {errors.itemCode && <span style={styles.errorText}>{errors.itemCode}</span>}
          </div>

          {/* Type */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              style={{
                ...styles.input,
                ...(errors.type ? styles.inputError : {}),
              }}
            >
              <option value="FINISHED_GOOD">Finished Good</option>
              <option value="SUB_ASSEMBLY">Sub Assembly</option>
              <option value="RAW_MATERIAL">Raw Material</option>
            </select>
            {errors.type && <span style={styles.errorText}>{errors.type}</span>}
          </div>

          {/* Unit */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Unit</label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              placeholder="e.g. pcs, kg, meters"
              style={styles.input}
            />
          </div>

          {/* Description */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Optional description..."
              rows={3}
              style={{ ...styles.input, resize: 'vertical' }}
            />
          </div>

          {/* Buttons */}
          <div style={styles.buttonRow}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" style={styles.submitBtn}>
              {editItem ? 'Update Item' : 'Create Item'}
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

export default ItemForm;