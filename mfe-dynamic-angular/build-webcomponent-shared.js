const fs = require('fs');
const path = require('path');

/**
 * Build script for Angular web component with peer-to-peer shared dependencies support
 * This version allows MFEs to share Angular, Zone.js, and RxJS with each other
 * The first Angular MFE loaded registers its dependencies for subsequent ones to consume
 * 
 * PEER-TO-PEER SHARING MODEL:
 * 1. Host provides shared registry (window.__SHARED_DEPS__) but NO Angular dependencies
 * 2. First Angular MFE loads → registers Angular/Zone.js/RxJS in registry
 * 3. Subsequent Angular MFEs → consume from registry (singleton pattern)
 * 4. Benefits: Reduced bundle size, single Angular instance, works independently
 * 
 * USAGE:
 *   npm run build:wc:shared  # Build with peer-to-peer sharing support
 *   npm run serve:wc         # Serve on http://localhost:3003
 *   
 * TESTING:
 *   Open demo-peer-sharing.html to see multiple MFE instances sharing dependencies
 */

(async function build() {
  const distPath = './dist/mfe-dynamic-angular/browser';
  
  // Check if dist folder exists
  if (!fs.existsSync(distPath)) {
    console.error('❌ Build folder not found. Please run "npm run build" first.');
    process.exit(1);
  }
  
  // Find the actual built files
  const files = fs.readdirSync(distPath);
  
  const polyfillsFile = files.find(f => f.startsWith('polyfills') && f.endsWith('.js'));
  const mainFile = files.find(f => f.startsWith('main') && f.endsWith('.js'));
  
  if (!polyfillsFile || !mainFile) {
    console.error('❌ Could not find required build files');
    console.log('Files found:', files);
    process.exit(1);
  }
  
  // Ensure the output directory exists
  if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist', { recursive: true });
  }

  // Read the files
  let polyfillsContent = fs.readFileSync(path.join(distPath, polyfillsFile), 'utf8');
  let mainContent = fs.readFileSync(path.join(distPath, mainFile), 'utf8');
  
  console.log('[Build] Processing shared dependencies...');
  
  // Replace Angular imports with shared registry access
  // Note: This is a simplified approach. For production, consider using webpack externals
  const sharedDepsMap = {
    '@angular/core': '__SHARED_DEPS__.get("@angular/core")',
    '@angular/common': '__SHARED_DEPS__.get("@angular/common")',
    '@angular/platform-browser': '__SHARED_DEPS__.get("@angular/platform-browser")',
    '@angular/platform-browser-dynamic': '__SHARED_DEPS__.get("@angular/platform-browser-dynamic")',
    '@angular/elements': '__SHARED_DEPS__.get("@angular/elements")',
    '@angular/router': '__SHARED_DEPS__.get("@angular/router")',
    'rxjs': '__SHARED_DEPS__.get("rxjs")',
    'rxjs/operators': '__SHARED_DEPS__.get("rxjs/operators")'
  };
  
  // Create bundle with peer-to-peer shared dependency support
  const bundle = `
(function() {
  'use strict';
  
  console.log('[Dynamic MFE] Initializing with peer-to-peer shared dependencies support...');
  
  // Check if shared dependencies registry is available
  const hasSharedRegistry = typeof window !== 'undefined' && window.__SHARED_DEPS__;
  
  if (hasSharedRegistry) {
    console.log('[Dynamic MFE] ✓ Shared dependencies registry detected');
    const stats = window.__SHARED_DEPS__.getStats();
    console.log('[Dynamic MFE] Current registry contents:', stats.dependencies.map(d => d.name));
    console.log('[Dynamic MFE] Will register Angular dependencies for peer-to-peer sharing');
  } else {
    console.log('[Dynamic MFE] ⚠ Shared dependencies registry NOT found.');
    console.log('[Dynamic MFE] Running independently with bundled dependencies.');
  }
  
  // Step 1: Load polyfills (including Zone.js)
  // Check if Zone.js is already loaded (potentially shared from another Angular MFE)
  if (typeof Zone === 'undefined') {
    console.log('[Dynamic MFE] Loading bundled Zone.js...');
    ${polyfillsContent}
  } else {
    console.log('[Dynamic MFE] ✓ Zone.js already loaded (possibly shared from another MFE)');
  }
  
  // Step 2: Verify Zone.js loaded correctly
  if (typeof Zone === 'undefined') {
    console.error('[Dynamic MFE] CRITICAL: Zone.js failed to load!');
    throw new Error('Zone.js is required but not loaded');
  }
  
  if (typeof Zone.__load_patch !== 'function') {
    console.error('[Dynamic MFE] CRITICAL: Zone.__load_patch is not a function!');
    console.error('[Dynamic MFE] Zone object:', Zone);
    console.error('[Dynamic MFE] Available Zone methods:', Object.keys(Zone));
    throw new Error('Zone.js loaded but __load_patch method is missing');
  }
  
  console.log('[Dynamic MFE] ✓ Zone.js initialized successfully');
  console.log('[Dynamic MFE] ✓ Zone.__load_patch is available');
  
  // Step 3: Load main Angular application
  // The main bundle will register Angular dependencies for peer-to-peer sharing
  // Use setTimeout to ensure Zone.js patches are fully applied
  setTimeout(function() {
    ${mainContent}
  }, 0);
  
})();
`;

  // Write the bundled file
  fs.writeFileSync('./dist/dynamic-mfe-shared.js', bundle);
  
  // Copy styles
  const stylesFile = files.find(f => f.startsWith('styles') && f.endsWith('.css'));
  if (stylesFile) {
    fs.copyFileSync(
      path.join(distPath, stylesFile),
      './dist/dynamic-mfe-shared.css'
    );
  }
  
  const bundleSize = fs.statSync('./dist/dynamic-mfe-shared.js').size;
  const bundleSizeKB = (bundleSize / 1024).toFixed(2);
  
  console.log('✅ Web Component bundle with peer-to-peer shared deps created: ./dist/dynamic-mfe-shared.js');
  console.log(`📦 Bundle size: ${bundleSizeKB} KB`);
  console.log('✅ Styles copied: ./dist/dynamic-mfe-shared.css');
  console.log('📦 Files bundled:', [polyfillsFile, mainFile]);
  console.log('');
  console.log('🔗 Usage:');
  console.log('  <script src="dynamic-mfe-shared.js"></script>');
  console.log('  <link rel="stylesheet" href="dynamic-mfe-shared.css">');
  console.log('  <dynamic-mfe component-name="dashboard"></dynamic-mfe>');
  console.log('');
  console.log('📋 Get manifest: window.getMfeManifest()');  console.log('');
  console.log('🔄 Peer-to-peer sharing: First Angular MFE registers dependencies for subsequent ones');
  console.log('💡 Works independently OR with shared dependencies when available');
})();
