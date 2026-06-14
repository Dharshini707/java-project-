import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const [hover, setHover] = useState(null);

  const navLinks = [
    { path: '/',          label: 'Items' },
    { path: '/bom',       label: 'BOM' },
    { path: '/inventory', label: 'Inventory' },
    { path: '/mrp',       label: 'MRP Engine' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.navbar}>
      {/* Brand */}
      <div style={styles.brand}>
        🏭 MRP Engine
      </div>

      {/* Nav Links */}
      <div style={styles.linkContainer}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              ...styles.link,
              ...(isActive(link.path) ? styles.activeLink : {}),
              ...(hover === link.path && !isActive(link.path) ? styles.hoverLink : {}),
            }}
            onMouseEnter={() => setHover(link.path)}
            onMouseLeave={() => setHover(null)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1565C0',
    padding: '0 30px',
    height: '60px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
  },
  brand: {
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  linkContainer: {
    display: 'flex',
    gap: '10px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background 0.2s',
  },
  activeLink: {
    backgroundColor: '#0D47A1',
    borderBottom: '3px solid #90CAF9',
  },
  hoverLink: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
};

export default Navbar;