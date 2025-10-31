import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="component-container">
      <h1>👤 Profile Component</h1>
      <div class="profile-card">
        <h3>User Information</h3>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john.doe@example.com</p>
        <p><strong>Role:</strong> Administrator</p>
        <button>Edit Profile</button>
      </div>
    </div>
  `,
  styles: [`
    .component-container { padding: 20px; }
    .profile-card { background: white; padding: 30px; border-radius: 8px; max-width: 500px; }
    button { background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; }
  `]
})
export class ProfileComponent {}
