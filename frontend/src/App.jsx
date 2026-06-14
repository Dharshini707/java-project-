import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Sidebar from './components/common/Sidebar'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import AdminPage from './pages/AdminPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import ItemsPage from './pages/ItemsPage'
import BOMPage from './pages/BOMPage'
import InventoryPage from './pages/InventoryPage'
import MRPPage from './pages/MRPPage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  )

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
  }

  // Public layout — no sidebar
  if (!isLoggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/login"  element={<LoginPage  onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupPage onLogin={handleLogin} />} />
          <Route path="*"       element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    )
  }

  // Private layout — with sidebar
  return (
    <Router>
      <div style={styles.appContainer}>
        <Sidebar onLogout={handleLogout} />
        <div style={styles.mainContent}>
          <Routes>
            <Route path="/"          element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/items"     element={<ItemsPage />} />
            <Route path="/bom"       element={<BOMPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/mrp"       element={<MRPPage />} />
            <Route path="/admin"     element={<AdminPage />} />
            <Route path="/profile"   element={<ProfilePage />} />
            <Route path="/settings"  element={<SettingsPage />} />
            <Route path="*"          element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

const styles = {
  appContainer: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#F5F7FA',
  },
  mainContent: {
    flex: 1,
    padding: '24px',
    overflowY: 'auto',
    marginLeft: '240px',
  },
}

export default App;