import { useState } from 'react'

function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications:  true,
    emailAlerts:    true,
    lowStockAlert:  true,
    autoApprovePO:  false,
    darkMode:       false,
    language:       'English',
    currency:       'INR',
    lowStockLimit:  10,
  })

  const [passwordForm, setPasswordForm] = useState({
    current:  '',
    newPass:  '',
    confirm:  '',
  })

  const [saved,    setSaved]    = useState(false)
  const [pwSaved,  setPwSaved]  = useState(false)
  const [pwError,  setPwError]  = useState('')

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handlePasswordSave = () => {
    if (!passwordForm.current)
      return setPwError('Enter current password.')
    if (passwordForm.newPass.length < 6)
      return setPwError('New password must be 6+ characters.')
    if (passwordForm.newPass !== passwordForm.confirm)
      return setPwError('Passwords do not match.')
    setPwError('')
    setPwSaved(true)
    setPasswordForm({ current: '', newPass: '', confirm: '' })
    setTimeout(() => setPwSaved(false), 3000)
  }

  const ToggleSwitch = ({ value, onToggle }) => (
    <div
      onClick={onToggle}
      style={{
        width: '44px',
        height: '24px',
        borderRadius: '12px',
        backgroundColor: value ? '#1A237E' : '#ccc',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <div style={{
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        backgroundColor: 'white',
        position: 'absolute',
        top: '3px',
        left: value ? '23px' : '3px',
        transition: 'left 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
      }} />
    </div>
  )

  return (
    <div>
      <h2 style={styles.pageTitle}>⚙️ Settings</h2>
      <p style={styles.pageSub}>Configure your MRP system preferences</p>

      {saved && (
        <div style={styles.successBox}>✅ Settings saved successfully!</div>
      )}

      <div style={styles.layout}>

        {/* Notifications */}
        <div style={styles.card}>
          <h4 style={styles.cardTitle}>🔔 Notifications</h4>
          {[
            { key: 'notifications', label: 'Enable Notifications',  desc: 'Receive system notifications'     },
            { key: 'emailAlerts',   label: 'Email Alerts',          desc: 'Get alerts via email'             },
            { key: 'lowStockAlert', label: 'Low Stock Alerts',      desc: 'Alert when stock is critically low'},
            { key: 'autoApprovePO', label: 'Auto Approve POs',      desc: 'Auto approve low-value POs'       },
          ].map(item => (
            <div key={item.key} style={styles.toggleRow}>
              <div>
                <p style={styles.toggleLabel}>{item.label}</p>
                <p style={styles.toggleDesc}>{item.desc}</p>
              </div>
              <ToggleSwitch
                value={settings[item.key]}
                onToggle={() => handleToggle(item.key)}
              />
            </div>
          ))}
        </div>

        {/* Preferences */}
        <div style={styles.card}>
          <h4 style={styles.cardTitle}>🌐 Preferences</h4>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Language</label>
            <select
              name="language"
              value={settings.language}
              onChange={handleChange}
              style={styles.input}
            >
              <option>English</option>
              <option>Tamil</option>
              <option>Hindi</option>
            </select>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Currency</label>
            <select
              name="currency"
              value={settings.currency}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="INR">INR — Indian Rupee</option>
              <option value="USD">USD — US Dollar</option>
              <option value="EUR">EUR — Euro</option>
            </select>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              Low Stock Alert Threshold (units)
            </label>
            <input
              type="number"
              name="lowStockLimit"
              value={settings.lowStockLimit}
              onChange={handleChange}
              min="1"
              style={styles.input}
            />
          </div>

          <button onClick={handleSave} style={styles.saveBtn}>
            💾 Save Preferences
          </button>
        </div>

        {/* Change Password */}
        <div style={styles.card}>
          <h4 style={styles.cardTitle}>🔒 Change Password</h4>

          {pwSaved && (
            <div style={{ ...styles.successBox, marginBottom: '12px' }}>
              ✅ Password changed successfully!
            </div>
          )}
          {pwError && (
            <div style={styles.errorBox}>{pwError}</div>
          )}

          {[
            { label: 'Current Password', key: 'current' },
            { label: 'New Password',     key: 'newPass' },
            { label: 'Confirm Password', key: 'confirm' },
          ].map(f => (
            <div key={f.key} style={styles.fieldGroup}>
              <label style={styles.label}>{f.label}</label>
              <input
                type="password"
                value={passwordForm[f.key]}
                onChange={e => setPasswordForm(prev => ({
                  ...prev, [f.key]: e.target.value,
                }))}
                placeholder="••••••••"
                style={styles.input}
              />
            </div>
          ))}

          <button onClick={handlePasswordSave} style={styles.saveBtn}>
            🔐 Update Password
          </button>
        </div>

      </div>
    </div>
  )
}

const styles = {
  pageTitle: { fontSize: '22px', fontWeight: '800', color: '#1A237E', margin: 0 },
  pageSub:   { color: '#888', fontSize: '13px', margin: '4px 0 20px 0' },
  successBox: {
    backgroundColor: '#E8F5E9',
    border: '1px solid #A5D6A7',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#2E7D32',
    fontWeight: '600',
    marginBottom: '16px',
    fontSize: '14px',
  },
  errorBox: {
    backgroundColor: '#FFEBEE',
    border: '1px solid #FFCDD2',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#C62828',
    fontWeight: '600',
    marginBottom: '12px',
    fontSize: '14px',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  cardTitle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#333',
    margin: '0 0 4px 0',
    paddingBottom: '12px',
    borderBottom: '1px solid #f0f0f0',
  },
  toggleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
  },
  toggleLabel: { fontSize: '14px', fontWeight: '600', color: '#333', margin: 0 },
  toggleDesc:  { fontSize: '12px', color: '#888', margin: '2px 0 0 0' },
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#444' },
  input: {
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  saveBtn: {
    padding: '11px',
    backgroundColor: '#1A237E',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '4px',
  },
}

export default SettingsPage;