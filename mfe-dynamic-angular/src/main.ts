import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { registerSharedDependencies, hasSharedRegistry } from './utils/sharedDependencies';
import * as AngularCore from '@angular/core';
import * as AngularCommon from '@angular/common';
import * as AngularPlatformBrowser from '@angular/platform-browser';
import * as AngularPlatformBrowserDynamic from '@angular/platform-browser-dynamic';
import * as AngularElements from '@angular/elements';
import * as AngularRouter from '@angular/router';
import * as RxJS from 'rxjs';
import * as RxJSOperators from 'rxjs/operators';

// Register Angular dependencies for peer-to-peer sharing
// This allows other Angular MFEs to consume these dependencies if they load after this one
if (hasSharedRegistry()) {
  console.log('[mfe-dynamic-angular] Shared registry detected. Registering Angular dependencies for peer-to-peer sharing...');
  
  registerSharedDependencies([
    {
      name: '@angular/core',
      version: '20.3.9',
      module: AngularCore,
      singleton: true,
    },
    {
      name: '@angular/common',
      version: '20.3.9',
      module: AngularCommon,
      singleton: true,
    },
    {
      name: '@angular/platform-browser',
      version: '20.3.9',
      module: AngularPlatformBrowser,
      singleton: true,
    },
    {
      name: '@angular/platform-browser-dynamic',
      version: '20.3.9',
      module: AngularPlatformBrowserDynamic,
      singleton: true,
    },
    {
      name: '@angular/elements',
      version: '20.3.9',
      module: AngularElements,
      singleton: true,
    },
    {
      name: '@angular/router',
      version: '20.3.9',
      module: AngularRouter,
      singleton: true,
    },
    {
      name: 'rxjs',
      version: '7.8.0',
      module: RxJS,
      singleton: true,
    },
    {
      name: 'rxjs/operators',
      version: '7.8.0',
      module: RxJSOperators,
      singleton: true,
    },
  ]);
  
  // Register Zone.js if it's loaded globally
  if (typeof Zone !== 'undefined') {
    registerSharedDependencies([{
      name: 'zone.js',
      version: '0.15.1',
      module: Zone,
      singleton: true,
    }]);
  }
  
  console.log('[mfe-dynamic-angular] Angular dependencies registered for sharing');
} else {
  console.log('[mfe-dynamic-angular] Shared registry not available. Running with bundled dependencies.');
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));
