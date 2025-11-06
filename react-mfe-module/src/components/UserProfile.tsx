import React, { useState } from 'react';
import { emitNavigation, registerAllowedRoutes } from '../services/EventBus';

interface User {
  name: string;
  email: string;
  role: string;
  avatar: string;
  joinDate: string;
  stats: {
    projects: number;
    tasks: number;
    points: number;
  };
}

const defaultUser: User = {
  name: 'Lily Johnson',
  email: 'lily.johnson@example.com',
  role: 'Senior Developer',
  avatar: '👩‍💻',
  joinDate: '2024-01-15',
  stats: {
    projects: 12,
    tasks: 48,
    points: 2450,
  },
};

export const UserProfile: React.FC = () => {
  const [user] = useState<User>(defaultUser);
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'settings'>('overview');

  React.useEffect(() => {
    registerAllowedRoutes(['/dynamic-angular']);
  }, []);

  const goToDashboard = () => {
    emitNavigation({ fromApp: 'reactMfeModule', toRoute: '/dynamic-angular', query: { component: 'dashboard' } });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.avatarSection}>
          <div style={styles.avatar}>{user.avatar}</div>
          <div style={styles.userInfo}>
            <h2 style={styles.userName}>{user.name}</h2>
            <p style={styles.userEmail}>{user.email}</p>
            <div style={styles.badgeContainer}>
              <span style={styles.roleBadge}>{user.role}</span>
              <button style={styles.dashboardButton} onClick={goToDashboard}>
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.tabs}>
        <button
          style={activeTab === 'overview' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          style={activeTab === 'activity' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
          onClick={() => setActiveTab('activity')}
        >
          Activity
        </button>
        <button
          style={activeTab === 'settings' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      <div style={styles.content}>
        {activeTab === 'overview' && (
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📁</div>
              <div style={styles.statValue}>{user.stats.projects}</div>
              <div style={styles.statLabel}>Projects</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>✓</div>
              <div style={styles.statValue}>{user.stats.tasks}</div>
              <div style={styles.statLabel}>Tasks Completed</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>⭐</div>
              <div style={styles.statValue}>{user.stats.points}</div>
              <div style={styles.statLabel}>Points Earned</div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div style={styles.activityList}>
            <div style={styles.activityItem}>
              <span style={styles.activityIcon}>🎯</span>
              <div>
                <p style={styles.activityTitle}>Completed "Design System Update"</p>
                <p style={styles.activityTime}>2 hours ago</p>
              </div>
            </div>
            <div style={styles.activityItem}>
              <span style={styles.activityIcon}>💬</span>
              <div>
                <p style={styles.activityTitle}>Commented on "API Integration"</p>
                <p style={styles.activityTime}>5 hours ago</p>
              </div>
            </div>
            <div style={styles.activityItem}>
              <span style={styles.activityIcon}>📝</span>
              <div>
                <p style={styles.activityTitle}>Created new task "Code Review"</p>
                <p style={styles.activityTime}>1 day ago</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={styles.settingsForm}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Email Notifications</label>
              <input type="checkbox" defaultChecked />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Dark Mode</label>
              <input type="checkbox" />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Language</label>
              <select style={styles.formSelect}>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  header: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '30px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  avatarSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  avatar: {
    fontSize: '64px',
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: '50%',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 8px 0',
    color: '#333',
  },
  userEmail: {
    fontSize: '14px',
    color: '#666',
    margin: '0 0 12px 0',
  },
  roleBadge: {
    display: 'inline-block',
    padding: '6px 12px',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: '600',
  },
  badgeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  dashboardButton: {
    padding: '6px 16px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  tab: {
    padding: '12px 24px',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  activeTab: {
    backgroundColor: '#007bff',
    color: 'white',
    borderColor: '#007bff',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '30px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  statCard: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  statIcon: {
    fontSize: '32px',
    marginBottom: '12px',
  },
  statValue: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '8px',
  },
  statLabel: {
    fontSize: '14px',
    color: '#666',
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  activityItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  activityIcon: {
    fontSize: '24px',
  },
  activityTitle: {
    margin: '0 0 4px 0',
    fontWeight: '500',
    color: '#333',
  },
  activityTime: {
    margin: 0,
    fontSize: '12px',
    color: '#666',
  },
  settingsForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  formLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
  },
  formSelect: {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
};

export default UserProfile;
