import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="component-container">
      <h1>🏠 Home Component</h1>
      <p>Welcome to the Dynamic MFE Application</p>
      <div class="info-box">
        <h3>Available Components:</h3>
        <ul>
          <li><button (click)="navigate('dashboard')">Dashboard</button></li>
          <li><button (click)="navigate('profile')">Profile</button></li>
          <li><button (click)="navigate('settings')">Settings</button></li>
          <li><button (click)="navigate('analytics')">Analytics</button></li>
          <li><button (click)="navigate('reports')">Reports</button></li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .component-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .info-box {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
      margin-top: 20px;
    }
    button {
      background: #007bff;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      margin: 4px;
    }
    button:hover {
      background: #0056b3;
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
