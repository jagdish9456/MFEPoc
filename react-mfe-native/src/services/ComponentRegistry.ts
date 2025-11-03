import { Home } from '../components/Home';
import {
  Dashboard,
  Products,
  Orders,
  Customers,
  Analytics,
  Settings,
  Reports,
  Inventory,
  Billing,
  Support,
  Notifications,
} from '../components/Components';

export interface ComponentMetadata {
  name: string;
  component: React.ComponentType;
  route: string;
  description: string;
}

class ComponentRegistryService {
  private components: Map<string, ComponentMetadata> = new Map();

  constructor() {
    this.registerComponents();
  }

  private registerComponents() {
    const componentList: ComponentMetadata[] = [
      { name: 'Home', component: Home, route: '/home', description: 'Home page with overview' },
      { name: 'Dashboard', component: Dashboard, route: '/dashboard', description: 'Analytics dashboard' },
      { name: 'Products', component: Products, route: '/products', description: 'Product catalog' },
      { name: 'Orders', component: Orders, route: '/orders', description: 'Order management' },
      { name: 'Customers', component: Customers, route: '/customers', description: 'Customer management' },
      { name: 'Analytics', component: Analytics, route: '/analytics', description: 'Business analytics' },
      { name: 'Settings', component: Settings, route: '/settings', description: 'Application settings' },
      { name: 'Reports', component: Reports, route: '/reports', description: 'Report generation' },
      { name: 'Inventory', component: Inventory, route: '/inventory', description: 'Inventory tracking' },
      { name: 'Billing', component: Billing, route: '/billing', description: 'Billing and invoices' },
      { name: 'Support', component: Support, route: '/support', description: 'Customer support' },
      { name: 'Notifications', component: Notifications, route: '/notifications', description: 'System notifications' },
    ];

    componentList.forEach((meta) => {
      this.components.set(meta.name.toLowerCase(), meta);
    });
  }

  getComponent(name: string): ComponentMetadata | undefined {
    return this.components.get(name.toLowerCase());
  }

  getAllComponents(): ComponentMetadata[] {
    return Array.from(this.components.values());
  }

  getManifest() {
    return {
      elementName: 'react-native-mfe',
      version: '1.0.0',
      components: this.getAllComponents().map((meta) => ({
        name: meta.name,
        route: meta.route,
        description: meta.description,
      })),
    };
  }
}

export const componentRegistry = new ComponentRegistryService();
