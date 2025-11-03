/**
 * MFE Configuration
 * Centralized configuration for all micro frontends
 */

export interface MFEConfig {
  name: string;
  type: 'module-federation' | 'web-component';
  url: string;
  scope?: string;
  module?: string;
  elementName?: string;
  manifestUrl?: string;
  fallback?: React.ComponentType;
}

export const mfeConfig: Record<string, MFEConfig> = {
  // Module Federation MFEs
  
  reactMfeModule: {
    name: 'React MFE Module',
    type: 'module-federation',
    url: 'http://localhost:3004',
    scope: 'reactMfeModule',
    module: './ReactMFE',
  },
  
  reactNativeMfe: {
    name: 'React Native MFE',
    type: 'web-component',
    url: 'http://localhost:3005',
    elementName: 'react-native-mfe',
    manifestUrl: 'http://127.0.0.1:3005/react-native-mfe.js ',
  },
  
  // Web Component MFEs
  dynamicAngular: {
    name: 'Dynamic Angular MFE',
    type: 'web-component',
    url: 'http://localhost:3003',
    elementName: 'dynamic-mfe',
    manifestUrl: 'http://127.0.0.1:3003/dynamic-mfe.js',
  },
};

export const getMFEConfig = (mfeName: string): MFEConfig | undefined => {
  return mfeConfig[mfeName];
};

export const getAllMFEs = (): MFEConfig[] => {
  return Object.values(mfeConfig);
};
