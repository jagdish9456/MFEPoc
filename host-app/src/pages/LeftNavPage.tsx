import React from 'react';
import { MFELoader } from '../components/MFELoader';
import { getMFEConfig } from '../config/mfeConfig';

export const LeftNavPage: React.FC = () => {
  const config = getMFEConfig('leftNav');

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
        <MFELoader config={config} />
      </div>
    </div>
  );
};
