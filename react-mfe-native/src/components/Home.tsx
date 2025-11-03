import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
  standalone?: boolean;
}

export const Home: React.FC<HomeProps> = ({ standalone = true }) => {
  // Only use navigate hook in standalone mode
  const navigate = standalone ? useNavigate() : null;

  const handleNavigation = (path: string) => {
    if (navigate) {
      navigate(path);
    } else {
      // In embedded mode, emit event for host to handle
      const event = new CustomEvent('react-mfe-navigation', {
        detail: { path, componentName: path.substring(1) },
        bubbles: true,
        composed: true,
      });
      window.dispatchEvent(event);
      console.log('[React Native MFE] Navigation requested in embedded mode:', path);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏠 Home</h2>
      <p style={styles.text}>Welcome to the React Native MFE!</p>
      <div style={styles.cardGrid}>
        <div style={styles.card} onClick={() => handleNavigation('/dashboard')}>
          <span style={styles.icon}>📊</span>
          <h3>Dashboard</h3>
        </div>
        <div style={styles.card} onClick={() => handleNavigation('/products')}>
          <span style={styles.icon}>🛍️</span>
          <h3>Products</h3>
        </div>
        <div style={styles.card} onClick={() => handleNavigation('/orders')}>
          <span style={styles.icon}>📦</span>
          <h3>Orders</h3>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { padding: '20px', fontFamily: 'system-ui, sans-serif' },
  title: { fontSize: '28px', marginBottom: '16px', color: '#333' },
  text: { fontSize: '16px', color: '#666', marginBottom: '24px' },
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' },
  card: { padding: '24px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s' },
  icon: { fontSize: '48px', display: 'block', marginBottom: '12px' },
};
