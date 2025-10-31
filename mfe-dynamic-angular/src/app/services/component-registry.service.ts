import { Injectable, Type } from '@angular/core';

export interface ComponentMetadata {
  name: string;
  component: Type<any>;
  route?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ComponentRegistryService {
  private components: Map<string, ComponentMetadata> = new Map();

  registerComponent(metadata: ComponentMetadata): void {
    this.components.set(metadata.name, metadata);
  }

  getComponent(name: string): ComponentMetadata | undefined {
    return this.components.get(name);
  }

  getAllComponents(): ComponentMetadata[] {
    return Array.from(this.components.values());
  }

  getManifest(): any {
    return {
      elementName: 'dynamic-mfe',
      version: '1.0.0',
      components: this.getAllComponents().map(comp => ({
        name: comp.name,
        route: comp.route || `/${comp.name.toLowerCase()}`,
        description: comp.description || `${comp.name} component`
      }))
    };
  }
}
