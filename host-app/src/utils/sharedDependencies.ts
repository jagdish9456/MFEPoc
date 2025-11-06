/**
 * Shared Dependencies Registry
 * Provides singleton pattern for shared libraries across MFEs without Module Federation
 * Host provides React dependencies; MFEs can share their own framework dependencies peer-to-peer
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactRouterDOM from 'react-router-dom';

interface SharedDependency {
  name: string;
  version: string;
  module: any;
  singleton: boolean;
}

class SharedDependenciesRegistry {
  private registry: Map<string, SharedDependency> = new Map();
  private initialized: boolean = false;

  /**
   * Initialize shared dependencies registry
   * Should be called once in the host application on startup
   */
  initialize() {
    if (this.initialized) {
      console.warn('[SharedDeps] Registry already initialized');
      return;
    }

    // Register React singleton (Host's responsibility)
    this.register({
      name: 'react',
      version: React.version,
      module: React,
      singleton: true,
    });

    // Register ReactDOM singleton (Host's responsibility)
    this.register({
      name: 'react-dom',
      version: React.version,
      module: ReactDOM,
      singleton: true,
    });

    // Register React Router DOM singleton (Host's responsibility)
    this.register({
      name: 'react-router-dom',
      version: '6.26.0', // Match your package.json version
      module: ReactRouterDOM,
      singleton: true,
    });

    this.initialized = true;
    console.log('[SharedDeps] Host registry initialized with React dependencies:', Array.from(this.registry.keys()));
    console.log('[SharedDeps] MFEs can register their own framework dependencies for peer-to-peer sharing');
  }

  /**
   * Register a shared dependency
   * Public method to allow MFEs to register their own dependencies for peer-to-peer sharing
   */
  register(dependency: SharedDependency) {
    if (this.registry.has(dependency.name)) {
      const existing = this.registry.get(dependency.name)!;
      if (existing.singleton) {
        console.warn(`[SharedDeps] Singleton dependency "${dependency.name}" already registered. Keeping existing version ${existing.version}`);
        return;
      }
    }

    this.registry.set(dependency.name, dependency);
    console.log(`[SharedDeps] Registered: ${dependency.name}@${dependency.version} (singleton: ${dependency.singleton})`);
  }

  /**
   * Get a shared dependency
   */
  get(name: string): any | null {
    const dependency = this.registry.get(name);
    if (!dependency) {
      console.warn(`[SharedDeps] Dependency "${name}" not found in registry`);
      return null;
    }
    return dependency.module;
  }

  /**
   * Check if a dependency is registered
   */
  has(name: string): boolean {
    return this.registry.has(name);
  }

  /**
   * Get dependency info (for debugging)
   */
  getInfo(name: string): SharedDependency | null {
    return this.registry.get(name) || null;
  }

  /**
   * List all registered dependencies
   */
  list(): string[] {
    return Array.from(this.registry.keys());
  }

  /**
   * Get registry stats
   */
  getStats() {
    return {
      total: this.registry.size,
      dependencies: Array.from(this.registry.values()).map(dep => ({
        name: dep.name,
        version: dep.version,
        singleton: dep.singleton,
      })),
    };
  }
}

// Create singleton instance
const sharedDepsRegistry = new SharedDependenciesRegistry();

// Expose globally for web component MFEs to access
if (typeof window !== 'undefined') {
  (window as any).__SHARED_DEPS__ = sharedDepsRegistry;
}

export { sharedDepsRegistry };
export type { SharedDependency };
