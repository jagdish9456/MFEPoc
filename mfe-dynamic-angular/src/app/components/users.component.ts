import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="component-container"><h1>👥 Users Component</h1><p>User management interface</p></div>`,
  styles: [`.component-container { padding: 20px; }`]
})
export class UsersComponent {}
