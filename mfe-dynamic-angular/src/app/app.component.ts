import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentRef, Type, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComponentRegistryService } from './services/component-registry.service';
import { ManifestService } from './services/manifest.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="mfe-wrapper">
      <div class="mfe-header" *ngIf="showHeader">
        <h2>Dynamic MFE - {{ currentComponent }}</h2>
        <span class="version">v1.0.0</span>
        <span class="mode-badge" *ngIf="!isStandalone">Embedded Mode</span>
      </div>
      <div class="mfe-content">
        <!-- Use router-outlet only in standalone mode -->
        <router-outlet *ngIf="isStandalone"></router-outlet>
        
        <!-- Use dynamic component loading in embedded mode -->
        <ng-container *ngIf="!isStandalone" #dynamicComponentContainer></ng-container>
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
    .mode-badge {
      font-size: 11px;
      padding: 4px 8px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      margin-left: 10px;
    }
    .mfe-content {
      padding: 20px;
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy, OnChanges {
  @Input() componentName: string = 'home';
  @Input() showHeader: boolean = true;
  @Input() basePath: string = '';
  @Input() 
  set standalone(value: boolean | string) {
    // Handle string attributes from HTML
    this._isStandalone = value === true || value === 'true';
    console.log('[Dynamic MFE] Standalone mode:', this._isStandalone);
  }
  
  private _isStandalone: boolean = true; // Default to standalone
  get isStandalone(): boolean {
    return this._isStandalone;
  }
  
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) 
  dynamicComponentContainer?: ViewContainerRef;
  
  currentComponent: string = 'Home';
  private componentRef: ComponentRef<any> | null = null;
  private routerSubscription?: Subscription;

  constructor(
    private router: Router,
    private registry: ComponentRegistryService,
    private manifestService: ManifestService
  ) {
    console.log('[Dynamic MFE] App Component initialized');
  }

  ngOnInit() {
    console.log('[Dynamic MFE] AppComponent ngOnInit - componentName:', this.componentName, 'standalone:', this.isStandalone);
    
    if (this.isStandalone) {
      // Standalone mode: Use Angular Router
      this.initializeStandaloneMode();
    } else {
      // Embedded mode: Use dynamic component loading without router
      this.initializeEmbeddedMode();
    }
  }

  ngOnDestroy() {
    // Cleanup subscriptions
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    
    // Cleanup dynamic component
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  private initializeStandaloneMode() {
    console.log('[Dynamic MFE] Initializing in STANDALONE mode with router');
    
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
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
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

  private initializeEmbeddedMode() {
    console.log('[Dynamic MFE] Initializing in EMBEDDED mode without router');
    
    // Load the requested component directly without using router
    setTimeout(() => {
      this.loadComponent(this.componentName);
    }, 0);

    // Expose navigation method that uses direct component loading
    (window as any).navigateToMfeComponent = (componentName: string) => {
      console.log('[Dynamic MFE] External navigation requested (embedded mode):', componentName);
      this.loadComponent(componentName);
    };

    // Listen for attribute changes
    this.watchComponentNameChanges();
  }

  private loadComponent(componentName: string) {
    if (!this.dynamicComponentContainer) {
      console.error('[Dynamic MFE] Dynamic component container not available');
      return;
    }

    const componentMetadata = this.registry.getComponent(componentName.charAt(0).toUpperCase() + componentName.slice(1));
    
    if (!componentMetadata) {
      console.error('[Dynamic MFE] Component not found:', componentName);
      return;
    }

    console.log('[Dynamic MFE] Loading component:', componentMetadata.name);
    
    // Clear existing component
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.dynamicComponentContainer.clear();

    // Create and insert new component
    this.componentRef = this.dynamicComponentContainer.createComponent(componentMetadata.component);
    this.currentComponent = componentMetadata.name;
    
    console.log('[Dynamic MFE] Component loaded:', this.currentComponent);
    
    // Emit custom event to host application
    this.emitNavigationEvent(componentName);
  }

  private emitNavigationEvent(componentName: string) {
    const event = new CustomEvent('mfe-navigation', {
      detail: {
        componentName,
        currentComponent: this.currentComponent,
        timestamp: new Date().toISOString()
      },
      bubbles: true,
      composed: true // Allow event to cross shadow DOM boundary
    });
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(event);
    }
    
    console.log('[Dynamic MFE] Navigation event emitted:', componentName);
  }

  private watchComponentNameChanges() {
    // This will be called when the componentName input changes
    // Angular automatically handles input changes
  }

  // Handle input changes from host application
  ngOnChanges(changes: SimpleChanges) {
    if (!this.isStandalone && changes['componentName'] && !changes['componentName'].firstChange) {
      console.log('[Dynamic MFE] Component name changed to:', changes['componentName'].currentValue);
      this.loadComponent(changes['componentName'].currentValue);
    }
  }
}
