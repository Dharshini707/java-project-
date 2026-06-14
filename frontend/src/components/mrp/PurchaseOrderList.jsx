
function PurchaseOrderList({ purchaseOrders, onApprove }) {

  if (!purchaseOrders || purchaseOrders.length === 0) {
    return (
      <div style={styles.emptyBox}>
        <p>No purchase orders generated yet. Run MRP explosion to auto-generate POs.</p>
      </div>
    );
  }

  const getStatusStyle = (status) => {
    const map = {
      PENDING:  { bg: '#FFF3E0', color: '#E65100', label: 'Pending'  },
      APPROVED: { bg: '#E8F5E9', color: '#2E7D32', label: 'Approved' },
      REJECTED: { bg: '#FFEBEE', color: '#C62828', label: 'Rejected' },
    };
    return map[status] || { bg: '#F5F5F5', color: '#555', label: status };
  };

  const pendingCount  = purchaseOrders.filter(po => po.status === 'PENDING').length;
  const approvedCount = purchaseOrders.filter(po => po.status === 'APPROVED').length;

  return (
    <div>

      {/* Summary bar */}
      <div style={styles.summaryBar}>
        <div style={styles.summaryItem}>
          <span style={styles.summaryDot('#E65100')}></span>
          <span>{pendingCount} Pending</span>
        </div>
        <div style={styles.summaryItem}>
          <span style={styles.summaryDot('#2E7D32')}></span>
          <span>{approvedCount} Approved</span>
        </div>
        <div style={styles.summaryItem}>
          <span>📦 {purchaseOrders.length} Total POs</span>
        </div>
      </div>

      {/* PO Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>#</th>
              <th style={styles.th}>PO Number</th>
              <th style={styles.th}>Component</th>
              <th style={styles.th}>Item Code</th>
              <th style={styles.th}>Quantity to Order</th>
              <th style={styles.th}>Unit</th>
              <th style={styles.th}>Supplier</th>
              <th style={styles.th}>Created Date</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrders.map((po, index) => {
              const statusStyle = getStatusStyle(po.status);
              return (
                <tr
                  key={po.id}
                  style={styles.tr}
                  onMouseEnter={e =>
                    e.currentTarget.style.backgroundColor = '#F5F5F5'}
                  onMouseLeave={e =>
                    e.currentTarget.style.backgroundColor = 'white'}
                >
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>
                    <span style={styles.poBadge}>
                      {po.poNumber || `PO-${String(po.id).padStart(4, '0')}`}
                    </span>
                  </td>
                  <td style={{ ...styles.td, fontWeight: '600' }}>
                    {po.item?.name || '—'}
                  </td>
                  <td style={styles.td}>
                    <span style={styles.codeBadge}>
                      {po.item?.itemCode || '—'}
                    </span>
                  </td>
                  <td style={{ ...styles.td, textAlign: 'center' }}>
                    <strong style={{ color: '#1A237E', fontSize: '15px' }}>
                      {po.quantityOrdered}
                    </strong>
                  </td>
                  <td style={styles.td}>
                    {po.item?.unit || '—'}
                  </td>
                  <td style={styles.td}>
                    {po.supplier || 'Auto-assigned'}
                  </td>
                  <td style={styles.td}>
                    {po.createdDate
                      ? new Date(po.createdDate).toLocaleDateString()
                      : '—'}
                  </td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.statusBadge,
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.color,
                    }}>
                      {statusStyle.label}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {po.status === 'PENDING' ? (
                      <button
                        onClick={() => onApprove(po.id)}
                        style={styles.approveBtn}
                      >
                        ✓ Approve
                      </button>
                    ) : (
                      <span style={styles.approvedText}>
                        {po.status === 'APPROVED' ? '✓ Done' : '✕'}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  summaryBar: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '12px 20px',
    marginBottom: '16px',
    flexWrap: 'wrap',
    fontSize: '14px',
    fontWeight: '600',
    color: '#444',
  },
  summaryItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  summaryDot: (color) => ({
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: color,
    display: 'inline-block',
  }),
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
    backgroundColor: '#1A237E',
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
  poBadge: {
    backgroundColor: '#E8EAF6',
    color: '#1A237E',
    padding: '3px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontFamily: 'monospace',
    fontWeight: '700',
  },
  codeBadge: {
    backgroundColor: '#E8EAF6',
    color: '#1A237E',
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
  approveBtn: {
    backgroundColor: '#2E7D32',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
  },
  approvedText: {
    color: '#2E7D32',
    fontWeight: '700',
    fontSize: '14px',
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

export default PurchaseOrderList;