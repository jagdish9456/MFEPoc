const fs = require('fs');
const path = require('path');

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
  const polyfillsContent = fs.readFileSync(path.join(distPath, polyfillsFile), 'utf8');
  const mainContent = fs.readFileSync(path.join(distPath, mainFile), 'utf8');
  
  // Create bundle with proper module initialization
  // We use a deferred bootstrap pattern to ensure Zone.js is ready
  const bundle = `
(function() {
  'use strict';
  
  // Step 1: Load polyfills (including Zone.js)
  ${polyfillsContent}
  
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
  // Use setTimeout to ensure Zone.js patches are fully applied
  setTimeout(function() {
    ${mainContent}
  }, 0);
  
})();
`;

  // Write the bundled file
  fs.writeFileSync('./dist/dynamic-mfe.js', bundle);
  
  // Copy styles
  const stylesFile = files.find(f => f.startsWith('styles') && f.endsWith('.css'));
  if (stylesFile) {
    fs.copyFileSync(
      path.join(distPath, stylesFile),
      './dist/dynamic-mfe.css'
    );
  }
  
  const bundleSize = fs.statSync('./dist/dynamic-mfe.js').size;
  const bundleSizeKB = (bundleSize / 1024).toFixed(2);
  
  console.log('✅ Web Component bundle created: ./dist/dynamic-mfe.js');
  console.log(`📦 Bundle size: ${bundleSizeKB} KB`);
  console.log('✅ Styles copied: ./dist/dynamic-mfe.css');
  console.log('📦 Files bundled:', [polyfillsFile, mainFile]);
  console.log('');
  console.log('🔗 Usage:');
  console.log('  <script src="dynamic-mfe.js"></script>');
  console.log('  <link rel="stylesheet" href="dynamic-mfe.css">');
  console.log('  <dynamic-mfe component-name="dashboard"></dynamic-mfe>');
  console.log('');
  console.log('📋 Get manifest: window.getMfeManifest()');
  console.log('');
  console.log('🎯 Test: http://localhost:3003/demo.html');
})();
