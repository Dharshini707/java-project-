
function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.message}>{message}</p>

      <style>{`
        @keyframes spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  spinner: {
    width: '44px',
    height: '44px',
    border: '5px solid #e3e3e3',
    borderTop: '5px solid #1565C0',
    borderRadius: '50%',
    animation: 'spin 0.9s linear infinite',
  },
  message: {
    marginTop: '14px',
    color: '#555',
    fontSize: '14px',
  },
};

export default LoadingSpinner;