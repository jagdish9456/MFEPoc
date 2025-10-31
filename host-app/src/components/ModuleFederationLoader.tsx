import React, { Suspense, lazy, useEffect, useState } from 'react';
import { MFEConfig } from '../config/mfeConfig';

interface ModuleFederationLoaderProps {
  config: MFEConfig;
  fallback?: React.ReactNode;
  onError?: (error: Error) => void;
  [key: string]: any;
}

/**
 * ModuleFederationLoader
 * Dynamically loads Module Federation remotes
 */
export const ModuleFederationLoader: React.FC<ModuleFederationLoaderProps> = ({
  config,
  fallback = <div>Loading {config.name}...</div>,
  onError,
  ...props
}) => {
  const [RemoteComponent, setRemoteComponent] = useState<React.ComponentType<any> | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (config.type !== 'module-federation') {
      setError(new Error('Invalid MFE type for ModuleFederationLoader'));
      return;
    }

    console.log('[ModuleFederationLoader] Loading:', config.name, config.scope, config.module);

    const loadRemote = async () => {
      try {
        const module = await import(/* @vite-ignore */ `${config.scope}/${config.module}`);
        
        console.log('[ModuleFederationLoader] Module loaded:', module);
        
        // Handle default export or named export
        const Component = module.default || module[Object.keys(module)[0]];
        
        if (!Component) {
          throw new Error(`No component found in ${config.scope}/${config.module}`);
        }

        setRemoteComponent(() => Component);
      } catch (err) {
        console.error('[ModuleFederationLoader] Error loading remote:', err);
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        onError?.(error);
      }
    };

    loadRemote();
  }, [config, onError]);

  if (error) {
    return (
      <div className="mfe-error">
        <h3>Error Loading {config.name}</h3>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  if (!RemoteComponent) {
    return <>{fallback}</>;
  }

  return (
    <Suspense fallback={fallback}>
      <RemoteComponent {...props} />
    </Suspense>
  );
};
