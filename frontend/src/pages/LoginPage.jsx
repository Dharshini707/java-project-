import { useState } from 'react'

function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors]     = useState({})
  const [loading, setLoading]   = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.email.trim())    newErrors.email    = 'Email is required.'
    if (!formData.password.trim()) newErrors.password = 'Password is required.'
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Enter a valid email.'
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
    // Simulate login — replace with real API call later
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
          <p style={styles.logoSub}>Manufacturing Resource Planning</p>
        </div>

        <h3 style={styles.heading}>Welcome Back</h3>
        <p style={styles.subHeading}>Sign in to your account</p>

        <form onSubmit={handleSubmit} style={styles.form}>

          {/* Email */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@mrp.com"
              style={{
                ...styles.input,
                ...(errors.email ? styles.inputError : {}),
              }}
            />
            {errors.email &&
              <span style={styles.errorText}>{errors.email}</span>}
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

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.submitBtn,
              ...(loading ? styles.submitBtnDisabled : {}),
            }}
          >
            {loading ? '⏳ Signing in...' : 'Sign In'}
          </button>

        </form>

        {/* Signup link */}
        <p style={styles.switchText}>
          Don't have an account?{' '}
          <a href="/signup" style={styles.link}>Create Account</a>
        </p>

        {/* Demo credentials */}
        <div style={styles.demoBox}>
          <p style={styles.demoTitle}>Demo Credentials</p>
          <p style={styles.demoText}>Email: admin@mrp.com</p>
          <p style={styles.demoText}>Password: any password</p>
        </div>

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
    marginBottom: '24px',
  },
  logoIcon: {
    fontSize: '48px',
  },
  logoTitle: {
    color: '#1A237E',
    fontSize: '22px',
    fontWeight: '800',
    margin: '8px 0 4px 0',
  },
  logoSub: {
    color: '#888',
    fontSize: '13px',
    margin: 0,
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
    margin: '0 0 24px 0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
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
    padding: '12px 14px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border 0.2s',
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
    marginTop: '8px',
  },
  submitBtnDisabled: {
    backgroundColor: '#9FA8DA',
    cursor: 'not-allowed',
  },
  switchText: {
    textAlign: 'center',
    fontSize: '13px',
    color: '#666',
    marginTop: '20px',
  },
  link: {
    color: '#1A237E',
    fontWeight: '700',
    textDecoration: 'none',
  },
  demoBox: {
    backgroundColor: '#E8EAF6',
    borderRadius: '8px',
    padding: '12px 16px',
    marginTop: '16px',
    textAlign: 'center',
  },
  demoTitle: {
    color: '#1A237E',
    fontWeight: '700',
    fontSize: '12px',
    margin: '0 0 4px 0',
  },
  demoText: {
    color: '#3949AB',
    fontSize: '12px',
    margin: '2px 0',
  },
}

export default LoginPage;