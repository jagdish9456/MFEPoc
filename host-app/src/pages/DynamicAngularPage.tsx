import React, { useState } from 'react';
import { MFELoader } from '../components/MFELoader';
import { getMFEConfig } from '../config/mfeConfig';

const availableComponents = [
  'home', 'dashboard', 'profile', 'settings', 
  'analytics', 'reports', 'users', 'notifications',
  'messages', 'calendar', 'tasks'
];

export const DynamicAngularPage: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState('dashboard');
  const [showHeader, setShowHeader] = useState(true);
  const [standaloneMode, setStandaloneMode] = useState(false);
  const config = getMFEConfig('dynamicAngular');

  if (!config) {
    return <div>Error: MFE configuration not found</div>;
  }

  return (
    <div className="mfe-page">
     
      <div className="mfe-container">
        <MFELoader
          config={config}
          componentName={selectedComponent}
          showHeader={showHeader}
          basePath="/dynamic-angular"
          standalone={standaloneMode}
        />
      </div>
    </div>
  );
};
