/**
 * Shared Dependencies Consumer/Provider for Angular Web Components
 * Allows Angular web component MFEs to:
 * 1. Register their own dependencies for sharing with other MFEs (peer-to-peer)
 * 2. Consume shared dependencies from the registry if available
 * 3. Fall back to bundled versions if registry or dependency not available
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
    console.warn(`[mfe-dynamic-angular] Shared deps registry not found. Using bundled ${name}`);
    return fallback;
  }

  const shared = registry.get(name);
  
  if (!shared) {
    console.warn(`[mfe-dynamic-angular] Shared dependency "${name}" not found in registry. Using bundled version`);
    return fallback;
  }

  console.log(`[mfe-dynamic-angular] Using shared ${name} from registry`);
  return shared as T;
}

/**
 * Register dependencies for sharing with other MFEs
 * This allows peer-to-peer sharing - the first Angular MFE loaded registers its dependencies
 * for subsequent Angular MFEs to consume
 */
export function registerSharedDependencies(dependencies: Array<{
  name: string;
  version: string;
  module: any;
  singleton?: boolean;
}>) {
  if (typeof window === 'undefined') {
    console.warn('[mfe-dynamic-angular] Cannot register dependencies: window is undefined');
    return;
  }

  const registry = (window as any).__SHARED_DEPS__;
  
  if (!registry) {
    console.warn('[mfe-dynamic-angular] Shared deps registry not found. Dependencies not registered.');
    return;
  }

  dependencies.forEach(dep => {
    try {
      // Check if already registered
      if (registry.has(dep.name)) {
        const existing = registry.getInfo(dep.name);
        console.log(`[mfe-dynamic-angular] Dependency "${dep.name}" already registered (${existing.version}). Skipping.`);
        return;
      }

      // Register the dependency
      registry.register({
        name: dep.name,
        version: dep.version,
        module: dep.module,
        singleton: dep.singleton ?? true,
      });

      console.log(`[mfe-dynamic-angular] Registered shared dependency: ${dep.name}@${dep.version}`);
    } catch (error) {
      console.error(`[mfe-dynamic-angular] Failed to register ${dep.name}:`, error);
    }
  });
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
