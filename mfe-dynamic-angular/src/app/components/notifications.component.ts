import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="component-container"><h1>🔔 Notifications Component</h1><p>View and manage notifications</p></div>`,
  styles: [`.component-container { padding: 20px; }`]
})
export class NotificationsComponent {}
