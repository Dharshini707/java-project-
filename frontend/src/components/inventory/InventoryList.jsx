
function InventoryList({ inventory, onEdit, onDelete }) {

  if (inventory.length === 0) {
    return (
      <div style={styles.emptyBox}>
        <p>No inventory records found. Click <strong>+ Add Inventory</strong> to create one.</p>
      </div>
    );
  }

  const getStockStatus = (quantity) => {
    if (quantity <= 0)   return { label: 'Out of Stock',  bg: '#FFEBEE', color: '#C62828' };
    if (quantity <= 10)  return { label: 'Critical Low',  bg: '#FFF3E0', color: '#E65100' };
    if (quantity <= 50)  return { label: 'Low Stock',     bg: '#FFFDE7', color: '#F57F17' };
    return                      { label: 'In Stock',      bg: '#E8F5E9', color: '#2E7D32' };
  };

  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            <th style={styles.th}>#</th>
            <th style={styles.th}>Item Name</th>
            <th style={styles.th}>Item Code</th>
            <th style={styles.th}>Item Type</th>
            <th style={styles.th}>On-Hand Quantity</th>
            <th style={styles.th}>Unit</th>
            <th style={styles.th}>Stock Status</th>
            <th style={styles.th}>Last Updated</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((inv, index) => {
            const status = getStockStatus(inv.quantityOnHand);
            return (
              <tr
                key={inv.id}
                style={styles.tr}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
              >
                <td style={styles.td}>{index + 1}</td>
                <td style={{ ...styles.td, fontWeight: '500' }}>
                  {inv.item?.name || '—'}
                </td>
                <td style={styles.td}>
                  <span style={styles.codeBadge}>
                    {inv.item?.itemCode || '—'}
                  </span>
                </td>
                <td style={styles.td}>
                  {inv.item?.type || '—'}
                </td>
                <td style={{ ...styles.td, textAlign: 'center' }}>
                  <strong style={{
                    color: inv.quantityOnHand <= 10 ? '#C62828' : '#2E7D32',
                    fontSize: '15px',
                  }}>
                    {inv.quantityOnHand}
                  </strong>
                </td>
                <td style={styles.td}>
                  {inv.item?.unit || '—'}
                </td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: status.bg,
                    color: status.color,
                  }}>
                    {status.label}
                  </span>
                </td>
                <td style={styles.td}>
                  {inv.lastUpdated
                    ? new Date(inv.lastUpdated).toLocaleDateString()
                    : '—'}
                </td>
                <td style={styles.td}>
                  <button
                    onClick={() => onEdit(inv)}
                    style={styles.editBtn}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(inv.item?.id)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
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
    backgroundColor: '#F57C00',
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
  codeBadge: {
    backgroundColor: '#FFF3E0',
    color: '#E65100',
    padding: '3px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontFamily: 'monospace',
  },
  statusBadge: {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
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

export default InventoryList;