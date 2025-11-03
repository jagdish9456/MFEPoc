import React from 'react';
import { ProductList } from './ProductList';
import { UserProfile } from './UserProfile';

interface ReactMFERemoteProps {
  view?: 'products' | 'profile' | 'dashboard';
  onNavigate?: (view: string) => void;
}

export const ReactMFERemote: React.FC<ReactMFERemoteProps> = ({ 
  view = 'dashboard',
  onNavigate 
}) => {
  const [currentView, setCurrentView] = React.useState(view);

  React.useEffect(() => {
    setCurrentView(view);
  }, [view]);

  const handleViewChange = (newView: 'products' | 'profile' | 'dashboard') => {
    setCurrentView(newView);
    onNavigate?.(newView);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>React MFE Module</h1>
        <div style={styles.nav}>
          <button
            style={currentView === 'dashboard' ? { ...styles.navButton, ...styles.activeButton } : styles.navButton}
            onClick={() => handleViewChange('dashboard')}
          >
            Dashboard
          </button>
          <button
            style={currentView === 'products' ? { ...styles.navButton, ...styles.activeButton } : styles.navButton}
            onClick={() => handleViewChange('products')}
          >
            Products
          </button>
          <button
            style={currentView === 'profile' ? { ...styles.navButton, ...styles.activeButton } : styles.navButton}
            onClick={() => handleViewChange('profile')}
          >
            Profile
          </button>
        </div>
      </div>

      <div style={styles.content}>
        {currentView === 'dashboard' && (
          <div style={styles.dashboard}>
            <h2 style={styles.welcomeTitle}>Welcome to React MFE Module</h2>
            <p style={styles.description}>
              This is a federated React micro-frontend that can be consumed by any host application.
            </p>
            
            <div style={styles.featureGrid}>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>📦</div>
                <h3 style={styles.featureTitle}>Module Federation</h3>
                <p style={styles.featureText}>
                  Exposes components via Vite Module Federation
                </p>
              </div>
              
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>⚡</div>
                <h3 style={styles.featureTitle}>Standalone Ready</h3>
                <p style={styles.featureText}>
                  Runs independently with its own dev server
                </p>
              </div>
              
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🔗</div>
                <h3 style={styles.featureTitle}>Shared Dependencies</h3>
                <p style={styles.featureText}>
                  Optimized sharing of React, ReactDOM, and Router
                </p>
              </div>
              
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🎨</div>
                <h3 style={styles.featureTitle}>Multiple Views</h3>
                <p style={styles.featureText}>
                  Product catalog and user profile components
                </p>
              </div>
            </div>

            <div style={styles.statsBar}>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Port:</span>
                <span style={styles.statValue}>3004</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Exposed Modules:</span>
                <span style={styles.statValue}>3</span>
              </div>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Framework:</span>
                <span style={styles.statValue}>React 18</span>
              </div>
            </div>
          </div>
        )}

        {currentView === 'products' && <ProductList />}
        {currentView === 'profile' && <UserProfile />}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '20px 30px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    margin: '0 0 16px 0',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: '10px',
  },
  navButton: {
    padding: '10px 20px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    border: 'none',
    borderRadius: '6px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  activeButton: {
    backgroundColor: 'white',
    color: '#28a745',
  },
  content: {
    padding: '30px',
  },
  dashboard: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  welcomeTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#333',
  },
  description: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '40px',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '40px',
  },
  featureCard: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  featureIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#333',
  },
  featureText: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.5',
  },
  statsBar: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  statItem: {
    textAlign: 'center',
  },
  statLabel: {
    display: 'block',
    fontSize: '12px',
    color: '#666',
    marginBottom: '8px',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  statValue: {
    display: 'block',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#28a745',
  },
};

export default ReactMFERemote;
