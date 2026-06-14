import { useState } from 'react'

function ProfilePage() {
  const [profile, setProfile] = useState({
    fullName:    'Ajay V',
    email:       'ajay@mrp.com',
    role:        'Production Planner',
    department:  'Manufacturing',
    phone:       '+91 98765 43210',
    location:    'Chennai, India',
    joinDate:    '01 Jan 2024',
  })

  const [editing, setEditing]   = useState(false)
  const [formData, setFormData] = useState(profile)
  const [saved, setSaved]       = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setProfile(formData)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <h2 style={styles.pageTitle}>👤 My Profile</h2>
      <p style={styles.pageSub}>View and update your profile information</p>

      {saved && (
        <div style={styles.successBox}>
          ✅ Profile updated successfully!
        </div>
      )}

      <div style={styles.layout}>

        {/* Left — Avatar card */}
        <div style={styles.avatarCard}>
          <div style={styles.avatar}>
            {profile.fullName.charAt(0).toUpperCase()}
          </div>
          <h3 style={styles.avatarName}>{profile.fullName}</h3>
          <p style={styles.avatarRole}>{profile.role}</p>
          <p style={styles.avatarDept}>{profile.department}</p>
          <div style={styles.avatarDivider} />
          <div style={styles.avatarInfo}>
            <p>📧 {profile.email}</p>
            <p>📞 {profile.phone}</p>
            <p>📍 {profile.location}</p>
            <p>📅 Joined {profile.joinDate}</p>
          </div>
        </div>

        {/* Right — Edit form */}
        <div style={styles.formCard}>
          <div style={styles.formHeader}>
            <h4 style={styles.formTitle}>Personal Information</h4>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                style={styles.editBtn}
              >
                ✏️ Edit Profile
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => { setEditing(false); setFormData(profile) }}
                  style={styles.cancelBtn}
                >
                  Cancel
                </button>
                <button onClick={handleSave} style={styles.saveBtn}>
                  💾 Save
                </button>
              </div>
            )}
          </div>

          <div style={styles.formGrid}>
            {[
              { label: 'Full Name',   name: 'fullName',   type: 'text' },
              { label: 'Email',       name: 'email',      type: 'text' },
              { label: 'Phone',       name: 'phone',      type: 'text' },
              { label: 'Department',  name: 'department', type: 'text' },
              { label: 'Location',    name: 'location',   type: 'text' },
              { label: 'Role',        name: 'role',       type: 'text' },
            ].map((field) => (
              <div key={field.name} style={styles.fieldGroup}>
                <label style={styles.label}>{field.label}</label>
                {editing ? (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    style={styles.input}
                  />
                ) : (
                  <p style={styles.fieldValue}>{profile[field.name]}</p>
                )}
              </div>
            ))}
          </div>
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
  layout: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  avatarCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '28px 24px',
    width: '220px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    textAlign: 'center',
    flexShrink: 0,
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#1A237E',
    color: 'white',
    fontSize: '32px',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px auto',
  },
  avatarName: { fontSize: '16px', fontWeight: '700', color: '#222', margin: '0 0 4px 0' },
  avatarRole: { fontSize: '13px', color: '#1A237E', fontWeight: '600', margin: '0 0 2px 0' },
  avatarDept: { fontSize: '12px', color: '#888', margin: 0 },
  avatarDivider: { borderTop: '1px solid #f0f0f0', margin: '16px 0' },
  avatarInfo: {
    textAlign: 'left',
    fontSize: '12px',
    color: '#555',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  formCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    minWidth: '280px',
  },
  formHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  formTitle: { fontSize: '15px', fontWeight: '700', color: '#333', margin: 0 },
  editBtn: {
    backgroundColor: '#1A237E',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
  },
  saveBtn: {
    backgroundColor: '#2E7D32',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
  },
  cancelBtn: {
    backgroundColor: 'white',
    color: '#555',
    border: '1px solid #ccc',
    borderRadius: '6px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '12px', fontWeight: '600', color: '#888', textTransform: 'uppercase' },
  input: {
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
  },
  fieldValue: {
    fontSize: '14px',
    color: '#333',
    fontWeight: '500',
    margin: 0,
    padding: '10px 0',
    borderBottom: '1px solid #f0f0f0',
  },
}

export default ProfilePage;