import React, { useState } from 'react';
import { MFELoader } from '../components/MFELoader';
import { getMFEConfig } from '../config/mfeConfig';

const availableComponents = [
  'home', 'dashboard', 'products', 'orders', 'customers',
  'analytics', 'settings', 'reports', 'inventory', 'billing',
  'support', 'notifications'
];

export const ReactNativeMFEPage: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState('home');
  const [standaloneMode, setStandaloneMode] = useState(false);
  const config = getMFEConfig('reactNativeMfe');

  if (!config) {
    return <div>Error: MFE configuration not found</div>;
  }

  return (
    <div className="mfe-page">
      <div className="mfe-header">
        <h2>{config.name}</h2>
        <span className="badge">{config.type}</span>
      </div>

      
      <div className="mfe-container">
        <MFELoader
          config={config}
          componentName={selectedComponent}
          standalone={standaloneMode}
        />

        <MFELoader
          config={config}
          componentName="dashboard"
          standalone={standaloneMode}
        />
      </div>
    </div>
  );
};
