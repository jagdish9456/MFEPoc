import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentRef, Type } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComponentRegistryService } from './services/component-registry.service';
import { ManifestService } from './services/manifest.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="mfe-wrapper">
      <div class="mfe-header" *ngIf="showHeader">
        <h2>Dynamic MFE - {{ currentComponent }}</h2>
        <span class="version">v1.0.0</span>
      </div>
      <div class="mfe-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .mfe-wrapper {
      width: 100%;
      height: 100%;
      min-height: 400px;
      background: #f5f5f5;
    }
    .mfe-header {
      background: #007bff;
      color: white;
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .mfe-header h2 {
      margin: 0;
      font-size: 18px;
    }
    .version {
      font-size: 12px;
      opacity: 0.8;
    }
    .mfe-content {
      padding: 20px;
    }
  `]
})
export class AppComponent implements OnInit {
  @Input() componentName: string = 'home';
  @Input() showHeader: boolean = true;
  @Input() basePath: string = '';
  
  currentComponent: string = 'Home';

  constructor(
    private router: Router,
    private registry: ComponentRegistryService,
    private manifestService: ManifestService
  ) {
    console.log('[Dynamic MFE] App Component initialized');
  }

  ngOnInit() {
    console.log('[Dynamic MFE] AppComponent ngOnInit - componentName:', this.componentName);
    
    // Wait for next tick to ensure router is fully initialized
    setTimeout(() => {
      // Handle dynamic component loading via attribute
      if (this.componentName) {
        const route = `/${this.componentName.toLowerCase()}`;
        console.log('[Dynamic MFE] Navigating to route:', route);
        this.currentComponent = this.componentName;
        
        // Use navigate with skipLocationChange for web component context
        this.router.navigate([route]).then(
          success => console.log('[Dynamic MFE] Navigation success:', success),
          error => console.error('[Dynamic MFE] Navigation error:', error)
        );
      }
    }, 0);

    // Listen for route changes
    this.router.events.subscribe((event) => {
      const url = this.router.url;
      this.currentComponent = url.substring(1) || 'Home';
      console.log('[Dynamic MFE] Route changed to:', url, 'Component:', this.currentComponent);
    });

    // Expose navigation method for external use
    (window as any).navigateToMfeComponent = (componentName: string) => {
      console.log('[Dynamic MFE] External navigation requested:', componentName);
      this.router.navigate([`/${componentName.toLowerCase()}`]);
    };
  }
}
