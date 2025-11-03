const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist');
const manifestPath = path.join(distPath, 'manifest.json');

// Read the dist directory
const files = fs.readdirSync(distPath);

const jsFiles = files.filter(f => f.endsWith('.js'));
const cssFiles = files.filter(f => f.endsWith('.css'));

const manifest = {
  elementName: 'react-native-mfe',
  version: '1.0.0',
  files: {
    js: jsFiles,
    css: cssFiles
  },
  entry: jsFiles[0] || 'react-native-mfe.js',
  styles: cssFiles[0] || 'react-native-mfe.css',
  components: [
    { name: 'Home', route: '/home', description: 'Home page with overview' },
    { name: 'Dashboard', route: '/dashboard', description: 'Analytics dashboard' },
    { name: 'Products', route: '/products', description: 'Product catalog' },
    { name: 'Orders', route: '/orders', description: 'Order management' },
    { name: 'Customers', route: '/customers', description: 'Customer management' },
    { name: 'Analytics', route: '/analytics', description: 'Business analytics' },
    { name: 'Settings', route: '/settings', description: 'Application settings' },
    { name: 'Reports', route: '/reports', description: 'Report generation' },
    { name: 'Inventory', route: '/inventory', description: 'Inventory tracking' },
    { name: 'Billing', route: '/billing', description: 'Billing and invoices' },
    { name: 'Support', route: '/support', description: 'Customer support' },
    { name: 'Notifications', route: '/notifications', description: 'System notifications' },
  ]
};

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log('✅ Manifest generated:', manifestPath);
console.log('📦 Files:', manifest.files);
console.log('📋 Components:', manifest.components.length);
