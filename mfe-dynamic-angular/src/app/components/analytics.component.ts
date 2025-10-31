import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="component-container">
      <h1>📈 Analytics Component</h1>
      <div class="metrics">
        <div class="metric"><h4>Page Views</h4><p>145,234</p><span class="trend up">↑ 12%</span></div>
        <div class="metric"><h4>Bounce Rate</h4><p>34.2%</p><span class="trend down">↓ 5%</span></div>
        <div class="metric"><h4>Avg. Duration</h4><p>3:24</p><span class="trend up">↑ 8%</span></div>
      </div>
    </div>
  `,
  styles: [`
    .component-container { padding: 20px; }
    .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
    .metric { background: white; padding: 20px; border-radius: 8px; }
    .trend { font-weight: bold; }
    .up { color: green; }
    .down { color: red; }
  `]
})
export class AnalyticsComponent {}
