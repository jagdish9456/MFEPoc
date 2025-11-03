import React from 'react';

export const Dashboard: React.FC = () => (
  <div style={{ padding: '20px' }}>
    <h2>📊 Dashboard</h2>
    <p>Analytics and metrics overview</p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px' }}>
      <div style={{ padding: '20px', background: '#e3f2fd', borderRadius: '8px' }}>
        <h3 style={{ margin: 0, color: '#1976d2' }}>1,234</h3>
        <p style={{ margin: '8px 0 0', color: '#666' }}>Total Users</p>
      </div>
      <div style={{ padding: '20px', background: '#f3e5f5', borderRadius: '8px' }}>
        <h3 style={{ margin: 0, color: '#7b1fa2' }}>567</h3>
        <p style={{ margin: '8px 0 0', color: '#666' }}>Active Sessions</p>
      </div>
      <div style={{ padding: '20px', background: '#e8f5e9', borderRadius: '8px' }}>
        <h3 style={{ margin: 0, color: '#388e3c' }}>$12.3K</h3>
        <p style={{ margin: '8px 0 0', color: '#666' }}>Revenue</p>
      </div>
    </div>
  </div>
);

export const Products: React.FC = () => (
  <div style={{ padding: '20px' }}>
    <h2>🛍️ Products</h2>
    <p>Product catalog and inventory</p>
  </div>
);

export const Orders: React.FC = () => (
  <div style={{ padding: '20px' }}>
    <h2>📦 Orders</h2>
    <p>Order management system</p>
  </div>
);

export const Customers: React.FC = () => (
  <div style={{ padding: '20px' }}>
    <h2>👥 Customers</h2>
    <p>Customer relationship management</p>
  </div>
);

export const Analytics: React.FC = () => (
  <div style={{ padding: '20px' }}>
    <h2>📈 Analytics</h2>
    <p>Business intelligence and reports</p>
  </div>
);

export const Settings: React.FC = () => (
  <div style={{ padding: '20px' }}>
    <h2>⚙️ Settings</h2>
    <p>Application configuration</p>
  </div>
);

export const Reports: React.FC = () => (
  <div style={{ padding: '20px' }}>
    <h2>📄 Reports</h2>
    <p>Generate and view reports</p>
  </div>
);

export const Inventory: React.FC = () => (
  <div style={{ padding: '20px' }}>
    <h2>📋 Inventory</h2>
    <p>Stock and inventory management</p>
  </div>
);

export const Billing: React.FC = () => (
  <div style={{ padding: '20px' }}>
    <h2>💳 Billing</h2>
    <p>Invoices and payment processing</p>
  </div>
);

export const Support: React.FC = () => (
  <div style={{ padding: '20px' }}>
    <h2>🎧 Support</h2>
    <p>Customer support and tickets</p>
  </div>
);

export const Notifications: React.FC = () => (
  <div style={{ padding: '20px' }}>
    <h2>🔔 Notifications</h2>
    <p>System notifications and alerts</p>
  </div>
);
