
function ErrorMessage({ message, onRetry }) {
  return (
    <div style={styles.container}>
      <div style={styles.iconRow}>
        <span style={styles.icon}>⚠️</span>
        <p style={styles.message}>{message}</p>
      </div>

      {onRetry && (
        <button onClick={onRetry} style={styles.retryButton}>
          Try Again
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#ffebee',
    border: '1px solid #ef9a9a',
    borderRadius: '8px',
    padding: '16px 20px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  icon: {
    fontSize: '20px',
  },
  message: {
    color: '#c62828',
    fontSize: '14px',
    margin: 0,
  },
  retryButton: {
    backgroundColor: '#c62828',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '13px',
  },
};

export default ErrorMessage;