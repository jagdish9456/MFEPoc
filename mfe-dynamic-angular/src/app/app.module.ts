import { NgModule, Injector, DoBootstrap } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, Router } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { ComponentRegistryService } from './services/component-registry.service';
import { ManifestService } from './services/manifest.service';

// Import all components
import { HomeComponent } from './components/home.component';
import { DashboardComponent } from './components/dashboard.component';
import { ProfileComponent } from './components/profile.component';
import { SettingsComponent } from './components/settings.component';
import { AnalyticsComponent } from './components/analytics.component';
import { ReportsComponent } from './components/reports.component';
import { UsersComponent } from './components/users.component';
import { NotificationsComponent } from './components/notifications.component';
import { MessagesComponent } from './components/messages.component';
import { CalendarComponent } from './components/calendar.component';
import { TasksComponent } from './components/tasks.component';

// Define routes
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'tasks', component: TasksComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false,
      initialNavigation: 'disabled'  // Disable automatic navigation for web components
    }),
    AppComponent
  ],
  providers: [
    ComponentRegistryService,
    ManifestService
  ]
})
export class AppModule implements DoBootstrap {
  constructor(
    private injector: Injector,
    private registry: ComponentRegistryService,
    private manifestService: ManifestService
  ) {
    // Register all components
    this.registerComponents();
  }

  private registerComponents() {
    this.registry.registerComponent({ name: 'Home', component: HomeComponent, route: '/home' });
    this.registry.registerComponent({ name: 'Dashboard', component: DashboardComponent, route: '/dashboard' });
    this.registry.registerComponent({ name: 'Profile', component: ProfileComponent, route: '/profile' });
    this.registry.registerComponent({ name: 'Settings', component: SettingsComponent, route: '/settings' });
    this.registry.registerComponent({ name: 'Analytics', component: AnalyticsComponent, route: '/analytics' });
    this.registry.registerComponent({ name: 'Reports', component: ReportsComponent, route: '/reports' });
    this.registry.registerComponent({ name: 'Users', component: UsersComponent, route: '/users' });
    this.registry.registerComponent({ name: 'Notifications', component: NotificationsComponent, route: '/notifications' });
    this.registry.registerComponent({ name: 'Messages', component: MessagesComponent, route: '/messages' });
    this.registry.registerComponent({ name: 'Calendar', component: CalendarComponent, route: '/calendar' });
    this.registry.registerComponent({ name: 'Tasks', component: TasksComponent, route: '/tasks' });
  }

  ngDoBootstrap() {
    // Create and register the custom element
    const appElement = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('dynamic-mfe', appElement);
    
    console.log('[Dynamic MFE] Web Component registered as <dynamic-mfe>');
    console.log('[Dynamic MFE] Manifest available via window.getMfeManifest()');
    console.log('[Dynamic MFE] Router configured with', routes.length - 2, 'routes');
  }
}
