import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="component-container"><h1>📅 Calendar Component</h1><p>Schedule and events management</p></div>`,
  styles: [`.component-container { padding: 20px; }`]
})
export class CalendarComponent {}
