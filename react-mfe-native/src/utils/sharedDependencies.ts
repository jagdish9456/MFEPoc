/**
 * Shared Dependencies Consumer/Provider for React Web Components
 * Allows React web component MFEs to:
 * 1. Consume shared React dependencies from the registry (provided by host)
 * 2. Work independently if registry not available
 */

/**
 * Get a shared dependency from the global registry
 * Falls back to locally bundled version if not available
 */
export function getSharedDependency<T = any>(name: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback;
  }

  const registry = (window as any).__SHARED_DEPS__;
  
  if (!registry) {
    console.warn(`[react-mfe-native] Shared deps registry not found. Using bundled ${name}`);
    return fallback;
  }

  const shared = registry.get(name);
  
  if (!shared) {
    console.warn(`[react-mfe-native] Shared dependency "${name}" not found in registry. Using bundled version`);
    return fallback;
  }

  console.log(`[react-mfe-native] Using shared ${name} from registry`);
  return shared as T;
}

/**
 * Check if shared dependencies registry is available
 */
export function hasSharedRegistry(): boolean {
  return typeof window !== 'undefined' && !!(window as any).__SHARED_DEPS__;
}

/**
 * Get registry stats (for debugging)
 */
export function getRegistryStats() {
  if (!hasSharedRegistry()) {
    return null;
  }
  return (window as any).__SHARED_DEPS__.getStats();
}
