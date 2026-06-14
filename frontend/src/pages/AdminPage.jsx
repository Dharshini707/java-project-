import { useState } from 'react'

const mockUsers = [
  { id: 1, name: 'Dharshini A',   email: 'dharshini@mrp.com', role: 'ADMIN',       status: 'Active'    },
  { id: 2, name: 'Ajay V',        email: 'ajay@mrp.com',      role: 'PLANNER',     status: 'Active'    },
  { id: 3, name: 'Priya S',       email: 'priya@mrp.com',     role: 'PROCUREMENT', status: 'Active'    },
  { id: 4, name: 'Ravi K',        email: 'ravi@mrp.com',      role: 'PLANNER',     status: 'Inactive'  },
]

function AdminPage() {
  const [users, setUsers]       = useState(mockUsers)
  const [search, setSearch]     = useState('')
  const [filterRole, setFilter] = useState('ALL')

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole   = filterRole === 'ALL' || u.role === filterRole
    return matchSearch && matchRole
  })

  const toggleStatus = (id) => {
    setUsers(prev => prev.map(u =>
      u.id === id
        ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' }
        : u
    ))
  }

  const getRoleBadge = (role) => {
    const map = {
      ADMIN:       { bg: '#EDE7F6', color: '#4527A0' },
      PLANNER:     { bg: '#E3F2FD', color: '#1565C0' },
      PROCUREMENT: { bg: '#FFF3E0', color: '#E65100' },
    }
    const s = map[role] || { bg: '#F5F5F5', color: '#555' }
    return (
      <span style={{
        backgroundColor: s.bg,
        color: s.color,
        padding: '3px 10px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600',
      }}>
        {role}
      </span>
    )
  }

  return (
    <div>
      <h2 style={styles.pageTitle}>🛡️ Admin Panel</h2>
      <p style={styles.pageSub}>Manage system users and roles</p>

      {/* Stats */}
      <div style={styles.statsRow}>
        {[
          { label: 'Total Users',    value: users.length,                                  color: '#1A237E' },
          { label: 'Active Users',   value: users.filter(u => u.status === 'Active').length,  color: '#2E7D32' },
          { label: 'Inactive Users', value: users.filter(u => u.status === 'Inactive').length, color: '#C62828' },
          { label: 'Admins',         value: users.filter(u => u.role === 'ADMIN').length,  color: '#4527A0' },
        ].map((s, i) => (
          <div key={i} style={{ ...styles.statCard, borderTop: `3px solid ${s.color}` }}>
            <p style={styles.statLabel}>{s.label}</p>
            <p style={{ ...styles.statValue, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={styles.filterRow}>
        <input
          type="text"
          placeholder="🔍 Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={filterRole}
          onChange={e => setFilter(e.target.value)}
          style={styles.select}
        >
          <option value="ALL">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="PLANNER">Planner</option>
          <option value="PROCUREMENT">Procurement</option>
        </select>
      </div>

      {/* Users Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user, i) => (
              <tr
                key={user.id}
                style={styles.tr}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F5F5F5'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
              >
                <td style={styles.td}>{i + 1}</td>
                <td style={{ ...styles.td, fontWeight: '600' }}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{getRoleBadge(user.role)}</td>
                <td style={styles.td}>
                  <span style={{
                    backgroundColor: user.status === 'Active' ? '#E8F5E9' : '#FFEBEE',
                    color: user.status === 'Active' ? '#2E7D32' : '#C62828',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                  }}>
                    {user.status}
                  </span>
                </td>
                <td style={styles.td}>
                  <button
                    onClick={() => toggleStatus(user.id)}
                    style={{
                      ...styles.actionBtn,
                      backgroundColor: user.status === 'Active' ? '#FFEBEE' : '#E8F5E9',
                      color: user.status === 'Active' ? '#C62828' : '#2E7D32',
                    }}
                  >
                    {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const styles = {
  pageTitle: { fontSize: '22px', fontWeight: '800', color: '#1A237E', margin: 0 },
  pageSub:   { color: '#888', fontSize: '13px', margin: '4px 0 20px 0' },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '14px',
    marginBottom: '20px',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
  },
  statLabel: { fontSize: '12px', color: '#888', margin: '0 0 6px 0', fontWeight: '600' },
  statValue: { fontSize: '24px', fontWeight: '800', margin: 0 },
  filterRow: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
    flexWrap: 'wrap',
  },
  searchInput: {
    flex: 1,
    minWidth: '200px',
    padding: '10px 14px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
  },
  select: {
    padding: '10px 14px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: 'white',
  },
  tableWrapper: {
    overflowX: 'auto',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
  },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' },
  thead: { backgroundColor: '#1A237E' },
  th: { padding: '12px 16px', textAlign: 'left', color: 'white', fontSize: '13px', fontWeight: '600' },
  tr: { borderBottom: '1px solid #f0f0f0', backgroundColor: 'white', transition: 'background 0.15s' },
  td: { padding: '12px 16px', fontSize: '14px', color: '#333', verticalAlign: 'middle' },
  actionBtn: {
    border: 'none',
    borderRadius: '6px',
    padding: '6px 14px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
  },
}

export default AdminPage;