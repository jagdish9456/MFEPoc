import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="component-container"><h1>✓ Tasks Component</h1><p>Task and project management</p></div>`,
  styles: [`.component-container { padding: 20px; }`]
})
export class TasksComponent {}
