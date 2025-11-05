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
    hostEventBus?: HostEventBus;
  }
}

// Cross-MFE Event Contracts
export type MFEEventName =
  | 'mfe:navigate'
  | 'host:navigate'
  | 'mfe:data'
  | 'dashboard:action';

export interface NavigationEventDetail {
  fromApp?: string;
  toRoute: string;
  params?: Record<string, string>;
  query?: Record<string, string | number | boolean>;
  state?: any;
  replace?: boolean;
  method?: 'push' | 'replace';
}

export interface DataEventDetail<T = any> {
  fromApp?: string;
  channel?: string;
  payload: T;
  meta?: Record<string, any>;
}

export interface MFEEventDetail<T = any> {
  type: MFEEventName;
  detail: T;
  timestamp: number;
}

export type MFEEvent<T = any> = CustomEvent<MFEEventDetail<T>>;

export interface HostEventBus {
  on(event: MFEEventName, handler: (e: MFEEvent<any>) => void): () => void;
  emit(event: MFEEventName, detail: any, options?: { bubbles?: boolean; composed?: boolean }): void;
  emitNavigation(detail: NavigationEventDetail): void;
  emitData<T = any>(detail: DataEventDetail<T>): void;
}

export {};
