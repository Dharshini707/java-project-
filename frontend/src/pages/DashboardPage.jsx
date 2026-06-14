import { useState, useEffect } from 'react'
import {
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'
import itemService from '../services/itemService'
import bomService from '../services/bomService'
import inventoryService from '../services/inventoryService'
import mrpService from '../services/mrpService'

function StatCard({ title, value, icon, color, sub, loading }) {
  return (
    <div style={{ ...styles.statCard, borderTop: `4px solid ${color}` }}>
      <div style={styles.statRow}>
        <div>
          <p style={styles.statTitle}>{title}</p>
          <p style={{ ...styles.statValue, color }}>
            {loading ? '...' : value}
          </p>
          {sub && <p style={styles.statSub}>{sub}</p>}
        </div>
        <span style={{ ...styles.statIcon, backgroundColor: color + '20' }}>
          {icon}
        </span>
      </div>
    </div>
  )
}

function DashboardPage() {
  const [items,     setItems]     = useState([])
  const [bomLinks,  setBomLinks]  = useState([])
  const [inventory, setInventory] = useState([])
  const [poList,    setPoList]    = useState([])
  const [loading,   setLoading]   = useState(true)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [itemsData, bomData, invData, poData] = await Promise.allSettled([
        itemService.getAllItems(),
        bomService.getAllBOMLinks(),
        inventoryService.getAllInventory(),
        mrpService.getPurchaseOrders(),
      ])
      if (itemsData.status === 'fulfilled') setItems(itemsData.value)
      if (bomData.status   === 'fulfilled') setBomLinks(bomData.value)
      if (invData.status   === 'fulfilled') setInventory(invData.value)
      if (poData.status    === 'fulfilled') setPoList(poData.value)
    } catch (err) {
      console.error('Dashboard fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Auto refresh every 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAll()
    }, 0)

    const interval = setInterval(() => {
      fetchAll()
      setLastRefresh(new Date())
    }, 30000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  // ── Derived stats ──────────────────────────────────────────

  const finishedGoods  = items.filter(i => i.type === 'FINISHED_GOOD')
  const subAssemblies  = items.filter(i => i.type === 'SUB_ASSEMBLY')
  const rawMaterials   = items.filter(i => i.type === 'RAW_MATERIAL')

  const outOfStock  = inventory.filter(i => i.quantityOnHand <= 0)
  const criticalLow = inventory.filter(i => i.quantityOnHand > 0  && i.quantityOnHand <= 10)
  const lowStock    = inventory.filter(i => i.quantityOnHand > 10 && i.quantityOnHand <= 50)
  const inStock     = inventory.filter(i => i.quantityOnHand > 50)

  const pendingPOs  = poList.filter(p => p.status === 'PENDING')
  const approvedPOs = poList.filter(p => p.status === 'APPROVED')

  // ── Chart data ─────────────────────────────────────────────

  // 1. Items by type — Bar chart
  const itemTypeData = [
    { type: 'Finished Goods', count: finishedGoods.length,  fill: '#1A237E' },
    { type: 'Sub Assemblies', count: subAssemblies.length,  fill: '#1565C0' },
    { type: 'Raw Materials',  count: rawMaterials.length,   fill: '#0288D1' },
  ]

  // 2. Inventory status — Pie chart
  const inventoryPieData = [
    { name: 'In Stock',     value: inStock.length,     color: '#2E7D32' },
    { name: 'Low Stock',    value: lowStock.length,     color: '#F57F17' },
    { name: 'Critical Low', value: criticalLow.length,  color: '#E65100' },
    { name: 'Out of Stock', value: outOfStock.length,   color: '#C62828' },
  ].filter(d => d.value > 0)

  // 3. Purchase Orders status — Bar chart
  const poStatusData = [
    { status: 'Pending',  count: pendingPOs.length,  fill: '#E65100' },
    { status: 'Approved', count: approvedPOs.length, fill: '#2E7D32' },
    { status: 'Total',    count: poList.length,      fill: '#1A237E' },
  ]

  // 4. Top 8 inventory items by quantity — Horizontal bar
  const topInventoryData = [...inventory]
    .sort((a, b) => b.quantityOnHand - a.quantityOnHand)
    .slice(0, 8)
    .map(inv => ({
      name:  inv.item?.name
               ? inv.item.name.length > 14
                 ? inv.item.name.substring(0, 14) + '…'
                 : inv.item.name
               : 'Unknown',
      stock: inv.quantityOnHand,
      fill:  inv.quantityOnHand <= 0  ? '#C62828'
           : inv.quantityOnHand <= 10 ? '#E65100'
           : inv.quantityOnHand <= 50 ? '#F57F17'
           : '#2E7D32',
    }))

  // 5. BOM links per item — top 6
  const bomCountMap = {}
  bomLinks.forEach(link => {
    const name = link.parentItem?.name || 'Unknown'
    bomCountMap[name] = (bomCountMap[name] || 0) + 1
  })
  const bomChartData = Object.entries(bomCountMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({
      name:  name.length > 12 ? name.substring(0, 12) + '…' : name,
      links: count,
    }))

  return (
    <div>

      {/* Header */}
      <div style={styles.pageHeader}>
        <div>
          <h2 style={styles.pageTitle}>📊 Live Dashboard</h2>
          <p style={styles.pageSub}>
            Real-time data from your MRP system
          </p>
        </div>
        <div style={styles.rightHeader}>
          <p style={styles.refreshText}>
            🕐 Last refreshed: {lastRefresh.toLocaleTimeString()}
          </p>
          <button onClick={fetchAll} style={styles.refreshBtn}>
            🔄 Refresh Now
          </button>
        </div>
      </div>

      {/* No backend warning */}
      {!loading && items.length === 0 && (
        <div style={styles.warningBox}>
          ⚠️ No data found. Make sure your Spring Boot backend is running
          at <strong>http://localhost:8080</strong> and you have added items.
        </div>
      )}

      {/* ── Stat Cards ── */}
      <div style={styles.statsGrid}>
        <StatCard
          title="Total Items"
          value={items.length}
          icon="📦"
          color="#1A237E"
          sub={`${finishedGoods.length} FG · ${subAssemblies.length} SA · ${rawMaterials.length} RM`}
          loading={loading}
        />
        <StatCard
          title="BOM Links"
          value={bomLinks.length}
          icon="🔗"
          color="#1565C0"
          sub="Parent → Child connections"
          loading={loading}
        />
        <StatCard
          title="Low / Critical Stock"
          value={criticalLow.length + outOfStock.length}
          icon="⚠️"
          color="#E65100"
          sub={`${outOfStock.length} out of stock`}
          loading={loading}
        />
        <StatCard
          title="Purchase Orders"
          value={poList.length}
          icon="📋"
          color="#2E7D32"
          sub={`${pendingPOs.length} pending approval`}
          loading={loading}
        />
      </div>

      {loading ? (
        <div style={styles.loadingBox}>
          <div style={styles.spinner} />
          <p style={{ color: '#888', marginTop: '12px' }}>
            Loading live data...
          </p>
        </div>
      ) : (
        <>

          {/* ── Row 1: Items by Type + Inventory Pie ── */}
          <div style={styles.chartsRow}>

            {/* Items by Type — Bar */}
            <div style={styles.chartCard}>
              <h4 style={styles.chartTitle}>
                📦 Items by Type
                <span style={styles.liveTag}>LIVE</span>
              </h4>
              {items.length === 0 ? (
                <p style={styles.noData}>
                  No items yet. Add items to see chart.
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={itemTypeData} barSize={50}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="type" fontSize={12} />
                    <YAxis
                      fontSize={12}
                      allowDecimals={false}
                      domain={[0, 'dataMax + 2']}
                    />
                    <Tooltip
                      formatter={(val) => [`${val} items`, 'Count']}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]} name="Items">
                      {itemTypeData.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Inventory Status — Pie */}
            <div style={{ ...styles.chartCard, maxWidth: '340px' }}>
              <h4 style={styles.chartTitle}>
                🥧 Inventory Status
                <span style={styles.liveTag}>LIVE</span>
              </h4>
              {inventory.length === 0 ? (
                <p style={styles.noData}>
                  No inventory yet. Add stock to see chart.
                </p>
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={inventoryPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {inventoryPieData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(val, name) => [`${val} items`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={styles.pieLegend}>
                    {inventoryPieData.map((item, i) => (
                      <div key={i} style={styles.pieLegendItem}>
                        <span style={{
                          ...styles.pieDot,
                          backgroundColor: item.color,
                        }} />
                        <span style={styles.pieLegendText}>
                          {item.name}: <strong>{item.value}</strong>
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

          </div>

          {/* ── Row 2: Top Inventory + BOM Links ── */}
          <div style={styles.chartsRow}>

            {/* Top inventory items */}
            <div style={styles.chartCard}>
              <h4 style={styles.chartTitle}>
                🏭 Stock Quantity — Top Items
                <span style={styles.liveTag}>LIVE</span>
              </h4>
              {topInventoryData.length === 0 ? (
                <p style={styles.noData}>
                  No inventory records yet.
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart
                    data={topInventoryData}
                    layout="vertical"
                    barSize={16}
                    margin={{ left: 20 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#f0f0f0"
                      horizontal={false}
                    />
                    <XAxis
                      type="number"
                      fontSize={11}
                      allowDecimals={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      fontSize={11}
                      width={90}
                    />
                    <Tooltip
                      formatter={(val) => [`${val} units`, 'Stock']}
                    />
                    <Bar dataKey="stock" radius={[0, 4, 4, 0]} name="Stock">
                      {topInventoryData.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* BOM links per item */}
            <div style={styles.chartCard}>
              <h4 style={styles.chartTitle}>
                🔗 BOM Links per Item
                <span style={styles.liveTag}>LIVE</span>
              </h4>
              {bomChartData.length === 0 ? (
                <p style={styles.noData}>
                  No BOM links yet. Add BOM links to see chart.
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={bomChartData} barSize={36}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" fontSize={11} />
                    <YAxis fontSize={12} allowDecimals={false} />
                    <Tooltip
                      formatter={(val) => [`${val} links`, 'BOM Links']}
                    />
                    <Bar
                      dataKey="links"
                      fill="#1565C0"
                      radius={[6, 6, 0, 0]}
                      name="BOM Links"
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

          </div>

          {/* ── Row 3: PO Status + Live Inventory Table ── */}
          <div style={styles.chartsRow}>

            {/* Purchase Orders */}
            <div style={{ ...styles.chartCard, maxWidth: '340px' }}>
              <h4 style={styles.chartTitle}>
                📋 Purchase Orders
                <span style={styles.liveTag}>LIVE</span>
              </h4>
              {poList.length === 0 ? (
                <p style={styles.noData}>
                  No purchase orders yet. Run MRP to generate POs.
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={poStatusData} barSize={50}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="status" fontSize={12} />
                    <YAxis fontSize={12} allowDecimals={false} />
                    <Tooltip
                      formatter={(val) => [`${val} POs`, 'Count']}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]} name="POs">
                      {poStatusData.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}

              {/* PO summary numbers */}
              <div style={styles.poSummary}>
                <div style={styles.poSummaryItem}>
                  <p style={{ ...styles.poNum, color: '#E65100' }}>
                    {pendingPOs.length}
                  </p>
                  <p style={styles.poLabel}>Pending</p>
                </div>
                <div style={styles.poSummaryItem}>
                  <p style={{ ...styles.poNum, color: '#2E7D32' }}>
                    {approvedPOs.length}
                  </p>
                  <p style={styles.poLabel}>Approved</p>
                </div>
                <div style={styles.poSummaryItem}>
                  <p style={{ ...styles.poNum, color: '#1A237E' }}>
                    {poList.length}
                  </p>
                  <p style={styles.poLabel}>Total</p>
                </div>
              </div>
            </div>

            {/* Critical stock table */}
            <div style={styles.chartCard}>
              <h4 style={styles.chartTitle}>
                🚨 Critical & Low Stock Items
                <span style={styles.liveTag}>LIVE</span>
              </h4>
              {[...outOfStock, ...criticalLow].length === 0 ? (
                <div style={styles.allGoodBox}>
                  ✅ All items have sufficient stock!
                </div>
              ) : (
                <div style={styles.criticalTable}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#FFF3E0' }}>
                        <th style={styles.cth}>Item</th>
                        <th style={styles.cth}>Code</th>
                        <th style={styles.cth}>Stock</th>
                        <th style={styles.cth}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...outOfStock, ...criticalLow]
                        .slice(0, 8)
                        .map((inv, i) => (
                          <tr key={i} style={styles.ctr}>
                            <td style={styles.ctd}>
                              {inv.item?.name || '—'}
                            </td>
                            <td style={styles.ctd}>
                              <span style={styles.codeTag}>
                                {inv.item?.itemCode || '—'}
                              </span>
                            </td>
                            <td style={{
                              ...styles.ctd,
                              fontWeight: '700',
                              color: inv.quantityOnHand <= 0
                                ? '#C62828' : '#E65100',
                            }}>
                              {inv.quantityOnHand}
                            </td>
                            <td style={styles.ctd}>
                              <span style={{
                                backgroundColor: inv.quantityOnHand <= 0
                                  ? '#FFEBEE' : '#FFF3E0',
                                color: inv.quantityOnHand <= 0
                                  ? '#C62828' : '#E65100',
                                padding: '2px 8px',
                                borderRadius: '10px',
                                fontSize: '11px',
                                fontWeight: '600',
                              }}>
                                {inv.quantityOnHand <= 0
                                  ? 'Out of Stock' : 'Critical'}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>

        </>
      )}

      {/* CSS for spinner */}
      <style>{`
        @keyframes spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  )
}

const styles = {
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#1A237E',
    margin: 0,
  },
  pageSub: {
    color: '#888',
    fontSize: '13px',
    margin: '4px 0 0 0',
  },
  rightHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '8px',
  },
  refreshText: {
    fontSize: '12px',
    color: '#888',
    margin: 0,
  },
  refreshBtn: {
    backgroundColor: '#1A237E',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
  },
  warningBox: {
    backgroundColor: '#FFF8E1',
    border: '1px solid #FFE082',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#F57F17',
    fontSize: '13px',
    fontWeight: '500',
    marginBottom: '20px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statTitle: {
    fontSize: '11px',
    color: '#888',
    fontWeight: '700',
    margin: '0 0 6px 0',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  statValue: {
    fontSize: '30px',
    fontWeight: '800',
    margin: 0,
  },
  statSub: {
    fontSize: '11px',
    color: '#aaa',
    margin: '4px 0 0 0',
  },
  statIcon: {
    fontSize: '22px',
    width: '46px',
    height: '46px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '60px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #e3e3e3',
    borderTop: '4px solid #1A237E',
    borderRadius: '50%',
    animation: 'spin 0.9s linear infinite',
  },
  chartsRow: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  chartCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    minWidth: '260px',
  },
  chartTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#333',
    margin: '0 0 16px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  liveTag: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
    fontSize: '10px',
    fontWeight: '700',
    padding: '2px 6px',
    borderRadius: '4px',
    letterSpacing: '0.5px',
  },
  noData: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: '13px',
    padding: '40px 0',
  },
  pieLegend: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginTop: '10px',
  },
  pieLegendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  pieDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  pieLegendText: {
    fontSize: '12px',
    color: '#555',
  },
  poSummary: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '16px',
    borderTop: '1px solid #f0f0f0',
    paddingTop: '14px',
  },
  poSummaryItem: {
    textAlign: 'center',
  },
  poNum: {
    fontSize: '22px',
    fontWeight: '800',
    margin: 0,
  },
  poLabel: {
    fontSize: '11px',
    color: '#888',
    margin: '2px 0 0 0',
    fontWeight: '600',
  },
  criticalTable: {
    overflowX: 'auto',
  },
  cth: {
    padding: '8px 12px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: '700',
    color: '#E65100',
  },
  ctr: {
    borderBottom: '1px solid #f5f5f5',
  },
  ctd: {
    padding: '8px 12px',
    fontSize: '13px',
    color: '#333',
  },
  codeTag: {
    backgroundColor: '#FFF3E0',
    color: '#E65100',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '11px',
    fontFamily: 'monospace',
  },
  allGoodBox: {
    backgroundColor: '#E8F5E9',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    color: '#2E7D32',
    fontWeight: '600',
    fontSize: '14px',
  },
}

export default DashboardPage;