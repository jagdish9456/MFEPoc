export type MFEEventName = 'mfe:navigate' | 'host:navigate' | 'mfe:data' | 'dashboard:action';

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

const allowedRoutes = new Set<string>();

export function registerAllowedRoutes(routes: string[]) {
  routes.forEach((r) => allowedRoutes.add(r));
}

export function emitNavigation(detail: NavigationEventDetail) {
  if (!allowedRoutes.has(detail.toRoute)) {
    console.warn('[react-mfe-module] Blocked navigation to unregistered route:', detail.toRoute);
    return;
  }
  const ev = new CustomEvent('mfe:navigate', {
    detail: { type: 'mfe:navigate', detail, timestamp: Date.now() },
    bubbles: true,
    composed: true,
  });
  window.dispatchEvent(ev);
}

export function emitData<T = any>(detail: DataEventDetail<T>) {
  const ev = new CustomEvent('mfe:data', {
    detail: { type: 'mfe:data', detail, timestamp: Date.now() },
    bubbles: true,
    composed: true,
  });
  window.dispatchEvent(ev);
}
