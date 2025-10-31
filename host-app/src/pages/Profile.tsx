import React, { useState } from 'react';
import { MFELoader } from '../components/MFELoader';
import { getMFEConfig } from '../config/mfeConfig';


export const Profile: React.FC = () => {
  const [selectedComponent] = useState('profile');
  const [showHeader] = useState(false);
  const config = getMFEConfig('dynamicAngular');

  if (!config) {
    return <div>Error: MFE configuration not found</div>;
  }

  return (
    <div className="mfe-page">
        <MFELoader
          config={config}
          componentName={selectedComponent}
          showHeader={showHeader}
          basePath="/profile"
        />
    </div>
  );
};
