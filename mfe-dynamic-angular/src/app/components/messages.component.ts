import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="component-container"><h1>💬 Messages Component</h1><p>Internal messaging system</p></div>`,
  styles: [`.component-container { padding: 20px; }`]
})
export class MessagesComponent {}
