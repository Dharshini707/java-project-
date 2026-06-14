import { useMemo, useState } from 'react';

function BOMTree({ bomLinks, items }) {

  const [expanded, setExpanded] = useState({});

  // Build a map: parentId → list of children
  const childrenMap = useMemo(() => {
    const map = {};
    bomLinks.forEach(link => {
      const parentId = link.parentItem?.id;
      if (!map[parentId]) map[parentId] = [];
      map[parentId].push(link);
    });
    return map;
  }, [bomLinks]);

  // Find root items — items that never appear as a child
  const childIds = new Set(bomLinks.map(link => link.childItem?.id));
  const rootItems = items.filter(
    item => !childIds.has(item.id) && childrenMap[item.id]
  );

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getTypeBadge = (type) => {
    const map = {
      FINISHED_GOOD: { bg: '#E8F5E9', color: '#2E7D32', label: 'FG'  },
      SUB_ASSEMBLY:  { bg: '#E3F2FD', color: '#1565C0', label: 'SA'  },
      RAW_MATERIAL:  { bg: '#FFF3E0', color: '#E65100', label: 'RM'  },
    };
    const b = map[type] || { bg: '#F5F5F5', color: '#555', label: '?' };
    return (
      <span style={{
        backgroundColor: b.bg,
        color: b.color,
        padding: '2px 7px',
        borderRadius: '10px',
        fontSize: '11px',
        fontWeight: '600',
        marginLeft: '8px',
      }}>
        {b.label}
      </span>
    );
  };

  // Recursive node renderer
  const renderNode = (item, quantity, depth = 0) => {
    const children = childrenMap[item.id] || [];
    const hasChildren = children.length > 0;
    const isExpanded = expanded[item.id] !== false; // default open

    return (
      <div key={item.id} style={{ marginLeft: depth === 0 ? 0 : 24 }}>
        <div
          style={{
            ...styles.node,
            backgroundColor: depth === 0 ? '#E3F2FD' : 'white',
            borderLeft: depth === 0
              ? '4px solid #1565C0'
              : '4px solid #90CAF9',
          }}
        >
          {/* Toggle button */}
          {hasChildren ? (
            <button
              onClick={() => toggleExpand(item.id)}
              style={styles.toggleBtn}
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          ) : (
            <span style={styles.leafIcon}>◆</span>
          )}

          {/* Item info */}
          <div style={styles.nodeContent}>
            <span style={styles.itemName}>{item.name}</span>
            <span style={styles.itemCode}>{item.itemCode}</span>
            {getTypeBadge(item.type)}
          </div>

          {/* Quantity pill (only for children) */}
          {quantity !== null && (
            <span style={styles.qtyPill}>
              × {quantity} {item.unit || ''}
            </span>
          )}
        </div>

        {/* Render children recursively */}
        {hasChildren && isExpanded && (
          <div style={styles.childrenContainer}>
            {children.map(link =>
              renderNode(link.childItem, link.quantityRequired, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  if (rootItems.length === 0) {
    return (
      <div style={styles.emptyBox}>
        <p>No BOM tree to display. Add BOM links to see the hierarchy.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.legendRow}>
        <span style={{ ...styles.legend, backgroundColor: '#E8F5E9', color: '#2E7D32' }}>FG = Finished Good</span>
        <span style={{ ...styles.legend, backgroundColor: '#E3F2FD', color: '#1565C0' }}>SA = Sub Assembly</span>
        <span style={{ ...styles.legend, backgroundColor: '#FFF3E0', color: '#E65100' }}>RM = Raw Material</span>
      </div>
      {rootItems.map(item => renderNode(item, null, 0))}
    </div>
  );
}

const styles = {
  container: {
    padding: '10px',
  },
  legendRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '16px',
    flexWrap: 'wrap',
  },
  legend: {
    padding: '4px 10px',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: '600',
  },
  node: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 14px',
    borderRadius: '6px',
    marginBottom: '6px',
    border: '1px solid #e0e0e0',
    gap: '10px',
  },
  toggleBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    color: '#1565C0',
    padding: '0 4px',
    minWidth: '20px',
  },
  leafIcon: {
    fontSize: '8px',
    color: '#90CAF9',
    minWidth: '20px',
    textAlign: 'center',
  },
  nodeContent: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    gap: '6px',
    flexWrap: 'wrap',
  },
  itemName: {
    fontWeight: '600',
    fontSize: '14px',
    color: '#222',
  },
  itemCode: {
    fontSize: '12px',
    color: '#888',
    fontFamily: 'monospace',
    backgroundColor: '#F5F5F5',
    padding: '2px 6px',
    borderRadius: '4px',
  },
  qtyPill: {
    backgroundColor: '#1565C0',
    color: 'white',
    padding: '3px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  childrenContainer: {
    marginLeft: '20px',
    borderLeft: '2px dashed #BBDEFB',
    paddingLeft: '10px',
    marginBottom: '4px',
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

export default BOMTree;