import React, { useEffect, useRef } from 'react';
import { useWebComponentLoader } from '../hooks/useWebComponentLoader';
import { MFEConfig } from '../config/mfeConfig';
import { WebComponentMFEProps } from '../types/mfe.types';

interface WebComponentLoaderProps extends WebComponentMFEProps {
  config: MFEConfig;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  standalone?: boolean; // Control Angular router behavior
}

/**
 * WebComponentLoader
 * Loads and renders native web component MFEs
 */
export const WebComponentLoader: React.FC<WebComponentLoaderProps> = ({
  config,
  onLoad,
  onError,
  componentName = 'home',
  showHeader = true,
  basePath = '',
  standalone = false, // Default to embedded mode when in host
  ...additionalProps
}) => {
  const elementRef = useRef<HTMLElement>(null);

  const { isLoaded, isLoading, error } = useWebComponentLoader({
    scriptUrl: config.manifestUrl || `${config.url}/dynamic-mfe.js`,
    elementName: config.elementName || 'dynamic-mfe',
    enabled: true,
  });

  useEffect(() => {
    if (error) {
      console.error('[WebComponentLoader] Load error:', error);
      onError?.(error);
    }
  }, [error, onError]);

  useEffect(() => {
    if (isLoaded) {
      console.log('[WebComponentLoader] Component loaded:', config.elementName);
      onLoad?.();

      // Set attributes on the web component
      if (elementRef.current) {
        elementRef.current.setAttribute('component-name', componentName);
        elementRef.current.setAttribute('show-header', String(showHeader));
        elementRef.current.setAttribute('base-path', basePath);
        elementRef.current.setAttribute('standalone', String(standalone));

        // Set any additional attributes
        Object.entries(additionalProps).forEach(([key, value]) => {
          if (elementRef.current) {
            elementRef.current.setAttribute(key, String(value));
          }
        });
      }

      // Listen for navigation events from the MFE
      const handleMFENavigation = (event: Event) => {
        const customEvent = event as CustomEvent;
        console.log('[WebComponentLoader] MFE navigation event:', customEvent.detail);
        // Host can react to MFE navigation if needed
      };

      window.addEventListener('mfe-navigation', handleMFENavigation);

      return () => {
        window.removeEventListener('mfe-navigation', handleMFENavigation);
      };
    }
  }, [isLoaded, componentName, showHeader, basePath, standalone, additionalProps, config.elementName, onLoad]);

  if (error) {
    return (
      <div className="mfe-error">
        <h3>Error Loading {config.name}</h3>
        <p>{error.message}</p>
        <p>URL: {config.manifestUrl || config.url}</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mfe-loading">
        <p>Loading {config.name}...</p>
      </div>
    );
  }

  if (!isLoaded) {
    return null;
  }

  // Render the custom element
  const elementName = config.elementName || 'dynamic-mfe';
  
  return React.createElement(elementName, {
    ref: elementRef,
    'component-name': componentName,
    'show-header': String(showHeader),
    'base-path': basePath,
    'standalone': String(standalone),
    ...additionalProps,
  });
};
