import { HostEventBus, MFEEventName, MFEEventDetail, NavigationEventDetail, DataEventDetail, MFEEvent } from '../types/mfe.types';

// Event Registry - Whitelist of allowed events from remote MFEs
interface AllowedEventRule {
  fromApp: string;
  eventType: MFEEventName;
  allowedRoutes?: string[]; // For navigation events
  allowedChannels?: string[]; // For data events
}

const allowedEventRegistry: AllowedEventRule[] = [
  // React MFE Module - Navigation events
  {
    fromApp: 'reactMfeModule',
    eventType: 'mfe:navigate',
    allowedRoutes: ['/profile', '/react-mfe', '/dynamic-angular'],
  },
  // React MFE Module - Data events
  {
    fromApp: 'reactMfeModule',
    eventType: 'mfe:data',
    allowedChannels: ['product:selected'],
  },
  // React Native MFE - Navigation events
  {
    fromApp: 'react-mfe-native',
    eventType: 'mfe:navigate',
    allowedRoutes: ['/react-native-mfe'],
  },
  // Angular Dynamic MFE - Navigation events
  {
    fromApp: 'mfe-dynamic-angular',
    eventType: 'mfe:navigate',
    allowedRoutes: ['/dynamic-angular'],
  },
];

// Validation function
function validateEvent(eventType: MFEEventName, detail: any): boolean {
  const fromApp = detail.fromApp;
  
  if (!fromApp) {
    console.warn('[Host EventBus] Blocked event: missing fromApp identifier', { eventType, detail });
    return false;
  }

  const rule = allowedEventRegistry.find(r => r.fromApp === fromApp && r.eventType === eventType);
  
  if (!rule) {
    console.warn('[Host EventBus] Blocked event: no matching rule found', { eventType, fromApp, detail });
    return false;
  }

  // Validate navigation events
  if (eventType === 'mfe:navigate' && rule.allowedRoutes) {
    const navDetail = detail as NavigationEventDetail;
    if (!navDetail.toRoute) {
      console.warn('[Host EventBus] Blocked navigation: missing toRoute', { fromApp, detail });
      return false;
    }
    if (!rule.allowedRoutes.includes(navDetail.toRoute)) {
      console.warn('[Host EventBus] Blocked navigation: route not in whitelist', { fromApp, toRoute: navDetail.toRoute, allowedRoutes: rule.allowedRoutes });
      return false;
    }
  }

  // Validate data events
  if (eventType === 'mfe:data' && rule.allowedChannels) {
    const dataDetail = detail as DataEventDetail<any>;
    if (!dataDetail.channel) {
      console.warn('[Host EventBus] Blocked data event: missing channel', { fromApp, detail });
      return false;
    }
    if (!rule.allowedChannels.includes(dataDetail.channel)) {
      console.warn('[Host EventBus] Blocked data event: channel not in whitelist', { fromApp, channel: dataDetail.channel, allowedChannels: rule.allowedChannels });
      return false;
    }
  }

  return true;
}

// Singleton Host Event Bus implementation with validation
class EventBus implements HostEventBus {
  on(event: MFEEventName, handler: (e: MFEEvent<any>) => void): () => void {
    const wrapped = (e: Event) => {
      const mfeEvent = e as MFEEvent<any>;
      const eventDetail = mfeEvent.detail?.detail;
      
      // Validate event before passing to handler
      if (!validateEvent(event, eventDetail)) {
        console.error('[Host EventBus] Event validation failed - handler not invoked', { event, detail: eventDetail });
        return;
      }
      
      handler(mfeEvent);
    };
    window.addEventListener(event, wrapped as EventListener, { passive: true } as AddEventListenerOptions);
    return () => window.removeEventListener(event, wrapped as EventListener);
  }

  emit(event: MFEEventName, detail: any, options?: { bubbles?: boolean; composed?: boolean }): void {
    const payload: MFEEventDetail<any> = {
      type: event,
      detail,
      timestamp: Date.now(),
    };
    const custom = new CustomEvent<MFEEventDetail<any>>(event, {
      detail: payload,
      bubbles: options?.bubbles ?? true,
      composed: options?.composed ?? true,
    });
    window.dispatchEvent(custom);
  }

  emitNavigation(detail: NavigationEventDetail): void {
    this.emit('mfe:navigate', detail, { bubbles: true, composed: true });
  }

  emitData<T = any>(detail: DataEventDetail<T>): void {
    this.emit('mfe:data', detail, { bubbles: true, composed: true });
  }
}

// Export singleton and hook
const hostEventBus: HostEventBus = (window.hostEventBus ??= new EventBus());

export function useEventBus(): HostEventBus {
  return hostEventBus;
}

export { hostEventBus };