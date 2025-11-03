import React, { useState } from 'react';
import { MFELoader } from '../components/MFELoader';
import { getMFEConfig } from '../config/mfeConfig';

export const ReactMFEPage: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'dashboard' | 'products' | 'profile'>('dashboard');
  const config = getMFEConfig('reactMfeModule');

  if (!config) {
    return <div>Error: MFE configuration not found</div>;
  }

  return (
    <div className="mfe-page">
      <div className="mfe-header">
        <h2>{config.name}</h2>
        <span className="badge">{config.type}</span>
      </div>

      <div className="mfe-controls">
        <div className="control-group">
          <label htmlFor="view-select">Select View:</label>
          <select
            id="view-select"
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value as any)}
          >
            <option value="dashboard">Dashboard</option>
            <option value="products">Products</option>
            <option value="profile">Profile</option>
          </select>
        </div>

        <div className="info-message">
          <span>📦 Module Federation - Shared React dependencies</span>
        </div>
      </div>

      <div className="mfe-container">
        <MFELoader 
          config={config} 
          view={selectedView}
        />
      </div>
    </div>
  );
};
