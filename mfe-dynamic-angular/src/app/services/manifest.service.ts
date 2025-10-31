import { Injectable } from '@angular/core';
import { ComponentRegistryService } from './component-registry.service';

@Injectable({
  providedIn: 'root'
})
export class ManifestService {
  constructor(private registry: ComponentRegistryService) {
    this.exposeManifestEndpoint();
  }

  private exposeManifestEndpoint(): void {
    // Expose manifest on window object for external access
    (window as any).getMfeManifest = () => this.registry.getManifest();
    
    // Also support fetching via custom element attribute
    (window as any).dynamicMfeManifest = this.registry.getManifest();
  }

  getManifest() {
    return this.registry.getManifest();
  }
}
