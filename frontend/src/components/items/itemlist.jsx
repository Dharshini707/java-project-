
function ItemList({ items, onEdit, onDelete }) {

  if (items.length === 0) {
    return (
      <div style={styles.emptyBox}>
        <p>No items found. Click <strong>+ Add Item</strong> to create one.</p>
      </div>
    );
  }

  const getTypeBadge = (type) => {
    const badgeStyles = {
      FINISHED_GOOD:  { backgroundColor: '#E8F5E9', color: '#2E7D32', label: 'Finished Good' },
      SUB_ASSEMBLY:   { backgroundColor: '#E3F2FD', color: '#1565C0', label: 'Sub Assembly'  },
      RAW_MATERIAL:   { backgroundColor: '#FFF3E0', color: '#E65100', label: 'Raw Material'  },
    };
    const badge = badgeStyles[type] || { backgroundColor: '#F5F5F5', color: '#555', label: type };
    return (
      <span style={{ ...styles.badge, backgroundColor: badge.backgroundColor, color: badge.color }}>
        {badge.label}
      </span>
    );
  };

  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            <th style={styles.th}>#</th>
            <th style={styles.th}>Item Name</th>
            <th style={styles.th}>Item Code</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Unit</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={item.id}
              style={styles.tr}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
            >
              <td style={styles.td}>{index + 1}</td>
              <td style={{ ...styles.td, fontWeight: '500' }}>{item.name}</td>
              <td style={styles.td}>{item.itemCode}</td>
              <td style={styles.td}>{getTypeBadge(item.type)}</td>
              <td style={styles.td}>{item.unit || '—'}</td>
              <td style={styles.td}>{item.description || '—'}</td>
              <td style={styles.td}>
                <button
                  onClick={() => onEdit(item)}
                  style={styles.editBtn}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  tableWrapper: {
    overflowX: 'auto',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
  },
  thead: {
    backgroundColor: '#1565C0',
  },
  th: {
    padding: '12px 16px',
    textAlign: 'left',
    color: 'white',
    fontSize: '13px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  tr: {
    borderBottom: '1px solid #f0f0f0',
    backgroundColor: 'white',
    transition: 'background 0.15s',
  },
  td: {
    padding: '12px 16px',
    fontSize: '14px',
    color: '#333',
    verticalAlign: 'middle',
  },
  badge: {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
  },
  editBtn: {
    backgroundColor: '#1976D2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '12px',
    marginRight: '6px',
  },
  deleteBtn: {
    backgroundColor: '#D32F2F',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  emptyBox: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#F9F9F9',
    borderRadius: '8px',
    border: '1px dashed #ccc',
    color: '#777',
  },
};

export default ItemList;