import React from 'react';
import { MFEConfig } from '../config/mfeConfig';
import { ModuleFederationLoader } from './ModuleFederationLoader';
import { WebComponentLoader } from './WebComponentLoader';

interface MFELoaderProps {
  config: MFEConfig;
  fallback?: React.ReactNode;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  [key: string]: any;
}

/**
 * MFELoader
 * Universal loader that handles both Module Federation and Web Component MFEs
 */
export const MFELoader: React.FC<MFELoaderProps> = ({
  config,
  fallback,
  onLoad,
  onError,
  ...props
}) => {
  console.log('[MFELoader] Loading MFE:', config.name, 'Type:', config.type);

  if (config.type === 'module-federation') {
    return (
      <ModuleFederationLoader
        config={config}
        fallback={fallback}
        onError={onError}
        {...props}
      />
    );
  }

  if (config.type === 'web-component') {
    return (
      <WebComponentLoader
        config={config}
        onLoad={onLoad}
        onError={onError}
        {...props}
      />
    );
  }

  return (
    <div className="mfe-error">
      <h3>Unknown MFE Type</h3>
      <p>MFE: {config.name}</p>
      <p>Type: {config.type}</p>
    </div>
  );
};
