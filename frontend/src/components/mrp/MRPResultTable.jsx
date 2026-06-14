
function MRPResultTable({ results }) {

  if (!results || results.length === 0) {
    return (
      <div style={styles.emptyBox}>
        <p>No MRP results to display. Run BOM explosion first.</p>
      </div>
    );
  }

  const getNetReqStatus = (netReq) => {
    if (netReq <= 0)  return { label: 'Sufficient Stock', bg: '#E8F5E9', color: '#2E7D32' };
    if (netReq <= 50) return { label: 'Low Shortage',     bg: '#FFF3E0', color: '#E65100' };
    return                  { label: 'High Shortage',     bg: '#FFEBEE', color: '#C62828' };
  };

  const totalShortage = results.reduce(
    (sum, r) => sum + (r.netRequirement > 0 ? r.netRequirement : 0), 0
  );

  return (
    <div>

      {/* Summary cards */}
      <div style={styles.summaryRow}>
        <div style={styles.summaryCard}>
          <p style={styles.summaryLabel}>Total Components</p>
          <p style={styles.summaryValue}>{results.length}</p>
        </div>
        <div style={{ ...styles.summaryCard, borderColor: '#C62828' }}>
          <p style={styles.summaryLabel}>Items Needing Purchase</p>
          <p style={{ ...styles.summaryValue, color: '#C62828' }}>
            {results.filter(r => r.netRequirement > 0).length}
          </p>
        </div>
        <div style={{ ...styles.summaryCard, borderColor: '#2E7D32' }}>
          <p style={styles.summaryLabel}>Items With Sufficient Stock</p>
          <p style={{ ...styles.summaryValue, color: '#2E7D32' }}>
            {results.filter(r => r.netRequirement <= 0).length}
          </p>
        </div>
        <div style={{ ...styles.summaryCard, borderColor: '#1A237E' }}>
          <p style={styles.summaryLabel}>Total Units to Purchase</p>
          <p style={{ ...styles.summaryValue, color: '#1A237E' }}>
            {totalShortage}
          </p>
        </div>
      </div>

      {/* Result Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Component</th>
              <th style={styles.th}>Item Code</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Gross Requirement</th>
              <th style={styles.th}>On-Hand Stock</th>
              <th style={styles.th}>Net Requirement</th>
              <th style={styles.th}>Unit</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => {
              const status    = getNetReqStatus(result.netRequirement);
              const needsToBuy = result.netRequirement > 0;
              return (
                <tr
                  key={result.itemId || index}
                  style={{
                    ...styles.tr,
                    backgroundColor: needsToBuy ? '#FFF8F8' : 'white',
                  }}
                  onMouseEnter={e =>
                    e.currentTarget.style.backgroundColor =
                      needsToBuy ? '#FFEBEE' : '#F5F5F5'}
                  onMouseLeave={e =>
                    e.currentTarget.style.backgroundColor =
                      needsToBuy ? '#FFF8F8' : 'white'}
                >
                  <td style={styles.td}>{index + 1}</td>
                  <td style={{ ...styles.td, fontWeight: '600' }}>
                    {result.componentName || '—'}
                  </td>
                  <td style={styles.td}>
                    <span style={styles.codeBadge}>
                      {result.itemCode || '—'}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {result.itemType || '—'}
                  </td>
                  <td style={{ ...styles.td, textAlign: 'center' }}>
                    <strong style={{ color: '#1A237E' }}>
                      {result.grossRequirement}
                    </strong>
                  </td>
                  <td style={{ ...styles.td, textAlign: 'center' }}>
                    <strong style={{
                      color: result.onHandInventory <= 10
                        ? '#C62828' : '#2E7D32',
                    }}>
                      {result.onHandInventory}
                    </strong>
                  </td>
                  <td style={{ ...styles.td, textAlign: 'center' }}>
                    <strong style={{
                      color: needsToBuy ? '#C62828' : '#2E7D32',
                      fontSize: '15px',
                    }}>
                      {needsToBuy ? result.netRequirement : 0}
                    </strong>
                  </td>
                  <td style={styles.td}>
                    {result.unit || '—'}
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Formula note */}
      <div style={styles.formulaNote}>
        💡 <strong>Net Requirement</strong> =
        Gross Requirement − On-Hand Stock &nbsp;|&nbsp;
        If result ≤ 0 → stock is sufficient, no purchase needed.
      </div>

    </div>
  );
}

const styles = {
  summaryRow: {
    display: 'flex',
    gap: '14px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  summaryCard: {
    flex: 1,
    minWidth: '140px',
    backgroundColor: 'white',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    padding: '14px 18px',
    textAlign: 'center',
  },
  summaryLabel: {
    margin: '0 0 6px 0',
    fontSize: '12px',
    color: '#777',
    fontWeight: '600',
  },
  summaryValue: {
    margin: 0,
    fontSize: '26px',
    fontWeight: '800',
    color: '#333',
  },
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
    transition: 'background 0.15s',
  },
  td: {
    padding: '12px 16px',
    fontSize: '14px',
    color: '#333',
    verticalAlign: 'middle',
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
  formulaNote: {
    marginTop: '12px',
    backgroundColor: '#E8EAF6',
    border: '1px solid #C5CAE9',
    borderRadius: '6px',
    padding: '10px 16px',
    fontSize: '13px',
    color: '#1A237E',
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

export default MRPResultTable;