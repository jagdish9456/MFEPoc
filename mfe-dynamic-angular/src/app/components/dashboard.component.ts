import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="component-container">
      <h1>📊 Dashboard Component</h1>
      <div class="grid">
        <div class="card"><h3>Total Users</h3><p class="value">12,453</p></div>
        <div class="card"><h3>Revenue</h3><p class="value">$45,231</p></div>
        <div class="card"><h3>Active Sessions</h3><p class="value">892</p></div>
        <div class="card"><h3>Conversions</h3><p class="value">3,842</p></div>
      </div>
    </div>
  `,
  styles: [`
    .component-container { padding: 20px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 20px; }
    .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .value { font-size: 24px; font-weight: bold; color: #007bff; }
  `]
})
export class DashboardComponent {}
