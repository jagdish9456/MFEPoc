import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { componentRegistry } from './services/ComponentRegistry';

class ReactNativeMFE extends HTMLElement {
  private root: ReactDOM.Root | null = null;
  private componentName: string = 'home';
  private standalone: boolean = false;

  static get observedAttributes() {
    return ['component-name', 'standalone'];
  }

  connectedCallback() {
    console.log('[React Native MFE] Web component connected');
    this.componentName = this.getAttribute('component-name') || 'home';
    this.standalone = this.getAttribute('standalone') === 'true';
    this.render();
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (name === 'component-name') {
      this.componentName = newValue || 'home';
    } else if (name === 'standalone') {
      this.standalone = newValue === 'true';
    }

    if (this.isConnected) {
      this.render();
    }
  }

  private render() {
    if (!this.root) {
      this.root = ReactDOM.createRoot(this);
    }

    this.root.render(
      <React.StrictMode>
        <App componentName={this.componentName} standalone={this.standalone} />
      </React.StrictMode>
    );
  }
}

// Register the custom element
if (!customElements.get('react-native-mfe')) {
  customElements.define('react-native-mfe', ReactNativeMFE);
  console.log('[React Native MFE] Web component registered as <react-native-mfe>');
}

// Expose manifest globally
(window as any).getReactNativeMfeManifest = () => componentRegistry.getManifest();

console.log('[React Native MFE] Manifest available via window.getReactNativeMfeManifest()');
