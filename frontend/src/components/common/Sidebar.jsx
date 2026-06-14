import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Sidebar({ onLogout }) {
  const location = useLocation()
  const [hover, setHover] = useState(null)

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard',  icon: '📊' },
    { path: '/items',     label: 'Items',       icon: '📦' },
    { path: '/bom',       label: 'BOM',         icon: '🔗' },
    { path: '/inventory', label: 'Inventory',   icon: '🏭' },
    { path: '/mrp',       label: 'MRP Engine',  icon: '⚙️' },
  ]

  const bottomItems = [
    { path: '/admin',    label: 'Admin',    icon: '🛡️' },
    { path: '/profile',  label: 'Profile',  icon: '👤' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ]

  const isActive = (path) => location.pathname === path

  const renderLink = (item) => (
    <Link
      key={item.path}
      to={item.path}
      style={{
        ...styles.menuItem,
        ...(isActive(item.path) ? styles.activeItem : {}),
        ...(hover === item.path && !isActive(item.path) ? styles.hoverItem : {}),
      }}
      onMouseEnter={() => setHover(item.path)}
      onMouseLeave={() => setHover(null)}
    >
      <span style={styles.icon}>{item.icon}</span>
      <span>{item.label}</span>
    </Link>
  )

  return (
    <div style={styles.sidebar}>

      {/* Brand */}
      <div style={styles.brand}>
        <span style={styles.brandIcon}>🏭</span>
        <div>
          <p style={styles.brandTitle}>MRP Engine</p>
          <p style={styles.brandSub}>Manufacturing System</p>
        </div>
      </div>

      {/* Main Menu */}
      <div style={styles.section}>
        <p style={styles.sectionLabel}>MAIN MENU</p>
        {menuItems.map(renderLink)}
      </div>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Bottom Menu */}
      <div style={styles.section}>
        <p style={styles.sectionLabel}>ACCOUNT</p>
        {bottomItems.map(renderLink)}
      </div>

      {/* Logout */}
      <div style={styles.logoutContainer}>
        <button
          onClick={onLogout}
          style={styles.logoutBtn}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#C62828'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>

    </div>
  )
}

const styles = {
  sidebar: {
    width: '240px',
    minHeight: '100vh',
    backgroundColor: '#1A237E',
    position: 'fixed',
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 100,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '20px 16px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  brandIcon: {
    fontSize: '28px',
  },
  brandTitle: {
    color: 'white',
    fontWeight: '700',
    fontSize: '15px',
    margin: 0,
  },
  brandSub: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '11px',
    margin: 0,
  },
  section: {
    padding: '12px 8px',
  },
  sectionLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '1.2px',
    padding: '0 8px',
    marginBottom: '6px',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    borderRadius: '8px',
    color: 'rgba(255,255,255,0.75)',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.15s',
    marginBottom: '2px',
  },
  activeItem: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: 'white',
    borderLeft: '3px solid #90CAF9',
  },
  hoverItem: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: 'white',
  },
  icon: {
    fontSize: '16px',
    width: '20px',
    textAlign: 'center',
  },
  divider: {
    borderTop: '1px solid rgba(255,255,255,0.1)',
    margin: '0 16px',
  },
  logoutContainer: {
    marginTop: 'auto',
    padding: '16px 8px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '10px 12px',
    backgroundColor: 'transparent',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '8px',
    color: 'rgba(255,255,255,0.75)',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.15s',
  },
}

export default Sidebar;