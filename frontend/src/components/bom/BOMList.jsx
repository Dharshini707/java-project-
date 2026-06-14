
function BOMList({ bomLinks, onEdit, onDelete }) {

  if (bomLinks.length === 0) {
    return (
      <div style={styles.emptyBox}>
        <p>No BOM links found. Click <strong>+ Add BOM Link</strong> to create one.</p>
      </div>
    );
  }

  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            <th style={styles.th}>#</th>
            <th style={styles.th}>Parent Item</th>
            <th style={styles.th}>Parent Code</th>
            <th style={styles.th}>Child Item</th>
            <th style={styles.th}>Child Code</th>
            <th style={styles.th}>Quantity Required</th>
            <th style={styles.th}>Unit</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bomLinks.map((bom, index) => (
            <tr
              key={bom.id}
              style={styles.tr}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
            >
              <td style={styles.td}>{index + 1}</td>
              <td style={{ ...styles.td, fontWeight: '500' }}>
                {bom.parentItem?.name || '—'}
              </td>
              <td style={styles.td}>
                <span style={styles.codeBadge}>
                  {bom.parentItem?.itemCode || '—'}
                </span>
              </td>
              <td style={{ ...styles.td, fontWeight: '500' }}>
                {bom.childItem?.name || '—'}
              </td>
              <td style={styles.td}>
                <span style={styles.codeBadge}>
                  {bom.childItem?.itemCode || '—'}
                </span>
              </td>
              <td style={{ ...styles.td, textAlign: 'center' }}>
                <strong>{bom.quantityRequired}</strong>
              </td>
              <td style={styles.td}>
                {bom.childItem?.unit || '—'}
              </td>
              <td style={styles.td}>
                <button
                  onClick={() => onEdit(bom)}
                  style={styles.editBtn}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(bom.id)}
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
  codeBadge: {
    backgroundColor: '#E3F2FD',
    color: '#1565C0',
    padding: '3px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontFamily: 'monospace',
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

export default BOMList;