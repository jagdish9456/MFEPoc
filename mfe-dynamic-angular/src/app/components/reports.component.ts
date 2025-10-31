import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="component-container">
      <h1>📋 Reports Component</h1>
      <div class="reports-list">
        <div class="report-item">Q4 2024 Financial Report</div>
        <div class="report-item">User Activity Summary</div>
        <div class="report-item">Performance Metrics</div>
        <div class="report-item">Security Audit</div>
      </div>
    </div>
  `,
  styles: [`
    .component-container { padding: 20px; }
    .reports-list { display: flex; flex-direction: column; gap: 10px; }
    .report-item { background: white; padding: 15px; border-radius: 4px; border: 1px solid #ddd; cursor: pointer; }
    .report-item:hover { background: #f8f9fa; }
  `]
})
export class ReportsComponent {}
