/**
 * Type definitions for MFE Host Application
 */

export interface MFEManifest {
  elementName: string;
  version: string;
  components: Array<{
    name: string;
    route: string;
    description: string;
  }>;
}

export interface WebComponentMFEProps {
  componentName?: string;
  showHeader?: boolean;
  basePath?: string;
  [key: string]: any;
}

export interface ModuleFederationMFEProps {
  [key: string]: any;
}

declare global {
  interface Window {
    getMfeManifest?: () => MFEManifest;
    navigateToMfeComponent?: (componentName: string) => void;
    dynamicMfeManifest?: MFEManifest;
  }
}

export {};
