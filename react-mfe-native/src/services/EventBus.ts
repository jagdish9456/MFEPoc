export type MFEEventName = 'mfe:navigate';

export interface NavigationEventDetail {
  fromApp?: string;
  toRoute: string;
  params?: Record<string, string>;
  query?: Record<string, string | number | boolean>;
  state?: any;
  replace?: boolean;
  method?: 'push' | 'replace';
}

const allowedRoutes = new Set<string>();

export function registerAllowedRoutes(routes: string[]) {
  routes.forEach((r) => allowedRoutes.add(r));
}

export function emitNavigation(detail: NavigationEventDetail) {
  if (!allowedRoutes.has(detail.toRoute)) {
    console.warn('[react-mfe-native] Blocked navigation to unregistered route:', detail.toRoute);
    return;
  }
  const ev = new CustomEvent('mfe:navigate', {
    detail: { type: 'mfe:navigate', detail, timestamp: Date.now() },
    bubbles: true,
    composed: true,
  });
  window.dispatchEvent(ev);
}
