/**
 * Zone.js initialization for Web Components
 * This file ensures Zone.js is loaded and fully initialized before Angular bootstraps
 */

// Import Zone.js and ensure it's exposed globally
import 'zone.js';

// Ensure Zone is available on window
if (typeof window !== 'undefined') {
  (window as any).Zone = Zone;
}

console.log('[Dynamic MFE] Zone.js polyfills loaded successfully');
console.log('[Dynamic MFE] Zone version:', (Zone as any).version || 'unknown');

// Verify critical Zone.js methods are available
if (Zone && typeof Zone.__load_patch === 'function') {
  console.log('[Dynamic MFE] Zone.__load_patch is available');
} else {
  console.error('[Dynamic MFE] Zone.__load_patch is NOT available!');
}
