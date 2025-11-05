import { HostEventBus, MFEEventName, MFEEventDetail, NavigationEventDetail, DataEventDetail, MFEEvent } from '../types/mfe.types';

// Singleton Host Event Bus implementation
class EventBus implements HostEventBus {
  on(event: MFEEventName, handler: (e: MFEEvent<any>) => void): () => void {
    const wrapped = (e: Event) => handler(e as MFEEvent<any>);
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