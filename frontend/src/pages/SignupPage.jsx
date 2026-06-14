import { useState } from 'react'

function SignupPage({ onLogin }) {
  const [formData, setFormData] = useState({
    fullName:        '',
    email:           '',
    password:        '',
    confirmPassword: '',
    role:            'PLANNER',
  })
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.fullName.trim())
      newErrors.fullName = 'Full name is required.'
    if (!formData.email.trim())
      newErrors.email = 'Email is required.'
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Enter a valid email.'
    if (!formData.password)
      newErrors.password = 'Password is required.'
    if (formData.password && formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters.'
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match.'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin()
    }, 1000)
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* Logo */}
        <div style={styles.logoBox}>
          <span style={styles.logoIcon}>🏭</span>
          <h2 style={styles.logoTitle}>MRP Engine</h2>
        </div>

        <h3 style={styles.heading}>Create Account</h3>
        <p style={styles.subHeading}>Join the MRP system</p>

        <form onSubmit={handleSubmit} style={styles.form}>

          {/* Full Name */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              style={{
                ...styles.input,
                ...(errors.fullName ? styles.inputError : {}),
              }}
            />
            {errors.fullName &&
              <span style={styles.errorText}>{errors.fullName}</span>}
          </div>

          {/* Email */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@company.com"
              style={{
                ...styles.input,
                ...(errors.email ? styles.inputError : {}),
              }}
            />
            {errors.email &&
              <span style={styles.errorText}>{errors.email}</span>}
          </div>

          {/* Role */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="PLANNER">Production Planner</option>
              <option value="PROCUREMENT">Procurement Manager</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* Password */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              style={{
                ...styles.input,
                ...(errors.password ? styles.inputError : {}),
              }}
            />
            {errors.password &&
              <span style={styles.errorText}>{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              style={{
                ...styles.input,
                ...(errors.confirmPassword ? styles.inputError : {}),
              }}
            />
            {errors.confirmPassword &&
              <span style={styles.errorText}>{errors.confirmPassword}</span>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.submitBtn,
              ...(loading ? styles.submitBtnDisabled : {}),
            }}
          >
            {loading ? '⏳ Creating Account...' : 'Create Account'}
          </button>

        </form>

        <p style={styles.switchText}>
          Already have an account?{' '}
          <a href="/login" style={styles.link}>Sign In</a>
        </p>

      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F5F7FA',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
  },
  logoBox: {
    textAlign: 'center',
    marginBottom: '16px',
  },
  logoIcon: { fontSize: '40px' },
  logoTitle: {
    color: '#1A237E',
    fontSize: '20px',
    fontWeight: '800',
    margin: '6px 0 0 0',
  },
  heading: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#222',
    margin: '0 0 4px 0',
    textAlign: 'center',
  },
  subHeading: {
    color: '#888',
    fontSize: '14px',
    textAlign: 'center',
    margin: '0 0 20px 0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#444',
  },
  input: {
    padding: '11px 14px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  inputError: {
    border: '1px solid #D32F2F',
    backgroundColor: '#fff8f8',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: '12px',
  },
  submitBtn: {
    padding: '13px',
    backgroundColor: '#1A237E',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '6px',
  },
  submitBtnDisabled: {
    backgroundColor: '#9FA8DA',
    cursor: 'not-allowed',
  },
  switchText: {
    textAlign: 'center',
    fontSize: '13px',
    color: '#666',
    marginTop: '16px',
  },
  link: {
    color: '#1A237E',
    fontWeight: '700',
    textDecoration: 'none',
  },
}

export default SignupPage;