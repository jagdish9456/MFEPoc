# Dynamic MFE - Angular 20 Web Component

A production-ready Angular 20 application built as a native web component with dynamic component loading capabilities, manifest endpoint, and flexible routing.

## 🎯 Features

### Core Features
- ✅ **Angular 20** with Node 22+ support
- ✅ **Native Web Component** using Angular Elements
- ✅ **Dynamic Component Loading** - Load any component at runtime via attributes
- ✅ **Manifest Endpoint** - Exposes available components via `window.getMfeManifest()`
- ✅ **10+ Components** - Pre-built components ready to use
- ✅ **Flexible Routing** - Works standalone or nested in other applications
- ✅ **Single Bundle** - Webpack-bundled for easy distribution
- ✅ **TypeScript 5.8+** - Full type safety

### Components Included
1. Home - Landing page with navigation
2. Dashboard - Metrics and analytics dashboard
3. Profile - User profile management
4. Settings - Application settings
5. Analytics - Advanced analytics view
6. Reports - Report generation
7. Users - User management
8. Notifications - Notification center
9. Messages - Messaging system
10. Calendar - Calendar and events
11. Tasks - Task management

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm start
# Opens on http://localhost:3003
```

### Build Web Component
```bash
npm run build:wc
```

This creates:
- `dist/dynamic-mfe.js` - Complete web component bundle
- `dist/dynamic-mfe.css` - Styles
- `dist/demo.html` - Demo page

### Serve Built Bundle
```bash
npm run serve:wc
# Access demo at http://localhost:3003/demo.html
```

## 📖 Usage

### Basic Usage
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="dynamic-mfe.css">
</head>
<body>
    <!-- Load default component (home) -->
    <dynamic-mfe></dynamic-mfe>
    
    <script src="dynamic-mfe.js"></script>
</body>
</html>
```

### Dynamic Component Loading
```html
<!-- Load specific component -->
<dynamic-mfe component-name="dashboard"></dynamic-mfe>

<!-- With custom configuration -->
<dynamic-mfe 
    component-name="analytics" 
    show-header="true"
    base-path="/app">
</dynamic-mfe>
```

### Programmatic Navigation
```javascript
// After MFE loads
window.navigateToMfeComponent('profile');
```

### Get Manifest
```javascript
const manifest = window.getMfeManifest();
console.log(manifest);
/*
{
  elementName: "dynamic-mfe",
  version: "1.0.0",
  components: [
    { name: "Home", route: "/home", description: "Home component" },
    { name: "Dashboard", route: "/dashboard", description: "Dashboard component" },
    ...
  ]
}
*/
```

## 🔧 Configuration

### Component Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `component-name` | string | `"home"` | Component to load on initialization |
| `show-header` | boolean | `true` | Show/hide the MFE header |
| `base-path` | string | `""` | Base path for routing |

### Environment Variables

Configure in `angular.json`:
```json
{
  "configurations": {
    "production": {
      "outputHashing": "none"  // Required for predictable bundle names
    }
  }
}
```

## 🏗️ Architecture

### Component Registry
The `ComponentRegistryService` maintains a registry of all available components and provides the manifest data.

### Routing
- **Standalone Mode**: Full routing with browser history
- **Nested Mode**: Hash-based routing to avoid conflicts with host application
- **Dynamic Routes**: All components accessible via `/{component-name}`

### Module Federation Ready
While currently using webpack bundling, the architecture supports migration to Module Federation for:
- Lazy loading
- Shared dependencies
- Remote component loading

## 📊 Bundle Size

```
Initial chunk files
main.js       : 227.86 kB (60.42 kB gzipped)
polyfills.js  : 34.59 kB (11.33 kB gzipped)
styles.css    : 318 bytes
Total         : ~262 kB (~72 kB gzipped)
```

## 🔌 Integration Examples

### React Host
```jsx
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'http://localhost:3003/dynamic-mfe.js';
    document.head.appendChild(script);
  }, []);

  return (
    <div>
      <dynamic-mfe component-name="dashboard" />
    </div>
  );
}
```

### Vue Host
```vue
<template>
  <div>
    <dynamic-mfe :component-name="currentComponent"></dynamic-mfe>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const currentComponent = ref('home');

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'http://localhost:3003/dynamic-mfe.js';
  document.head.appendChild(script);
});
</script>
```

### Plain HTML
```html
<script src="http://localhost:3003/dynamic-mfe.js"></script>
<link rel="stylesheet" href="http://localhost:3003/dynamic-mfe.css">

<dynamic-mfe component-name="analytics"></dynamic-mfe>

<script>
// Change component dynamically
setTimeout(() => {
  window.navigateToMfeComponent('dashboard');
}, 3000);
</script>
```

## 🧪 Testing

Access the demo page to test all features:
```
http://localhost:3003/demo.html
```

Features demonstrated:
- Component switching
- Manifest inspection
- Dynamic routing
- Programmatic navigation

## 📦 Deployment

### CDN Deployment
Upload `dist/dynamic-mfe.js` and `dist/dynamic-mfe.css` to your CDN and reference:

```html
<script src="https://cdn.example.com/dynamic-mfe.js"></script>
<link rel="stylesheet" href="https://cdn.example.com/dynamic-mfe.css">
```

### Static Hosting
Deploy the entire `dist` folder to any static hosting service (Netlify, Vercel, S3, etc.)

## 🛠️ Development

### Adding New Components

1. Create component file:
```typescript
// src/app/components/my-component.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-component',
  imports: [CommonModule],
  template: `<div><h1>My Component</h1></div>`,
  styles: [`div { padding: 20px; }`]
})
export class MyComponent {}
```

2. Register in `app.module.ts`:
```typescript
// Add to imports
import { MyComponent } from './components/my-component.component';

// Add to routes
const routes: Routes = [
  ...
  { path: 'my-component', component: MyComponent },
];

// Register component
this.registry.registerComponent({ 
  name: 'MyComponent', 
  component: MyComponent, 
  route: '/my-component' 
});
```

3. Rebuild:
```bash
npm run build:wc
```

## 🔍 API Reference

### Window API

| Method | Description | Returns |
|--------|-------------|---------|
| `window.getMfeManifest()` | Get component manifest | `Object` |
| `window.navigateToMfeComponent(name)` | Navigate to component | `void` |
| `window.dynamicMfeManifest` | Static manifest reference | `Object` |

## 📝 License

ISC

## 👥 Contributing

This is a POC project demonstrating advanced MFE patterns with Angular 20.

## 🎓 Learn More

- [Angular Elements](https://angular.dev/guide/elements)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
- [Micro Frontends](https://micro-frontends.org/)
