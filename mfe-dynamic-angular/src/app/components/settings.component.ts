import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="component-container">
      <h1>⚙️ Settings Component</h1>
      <div class="settings-sections">
        <div class="section"><h3>General</h3><p>Configure general application settings</p></div>
        <div class="section"><h3>Notifications</h3><p>Manage notification preferences</p></div>
        <div class="section"><h3>Privacy</h3><p>Control privacy and data sharing</p></div>
      </div>
    </div>
  `,
  styles: [`
    .component-container { padding: 20px; }
    .settings-sections { display: flex; flex-direction: column; gap: 15px; }
    .section { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #007bff; }
  `]
})
export class SettingsComponent {}
