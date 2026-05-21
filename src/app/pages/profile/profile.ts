import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['../../auth.css'],
  template: `
<div class="auth-page">

  <div class="auth-card" *ngIf="user; else notLogged">

    <h2>Profile</h2>

    <div class="profile-info">
      <span>Username</span>
      <p>{{ user.username }}</p>
    </div>

    <div class="profile-info">
      <span>Email</span>
      <p>{{ user.email }}</p>
    </div>

    <button class="auth-button" (click)="logout()">
      Logout
    </button>

  </div>

  <ng-template #notLogged>

    <div class="auth-card">

      <h2>Profile</h2>

      <p class="auth-link">
        You are not connected
      </p>

      <button class="auth-button" (click)="goToLogin()">
        Login
      </button>

      <button class="auth-button" (click)="goToRegister()">
        Register
      </button>

    </div>

  </ng-template>

</div>
`
})
export class ProfileComponent {

  user: any = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {

  const token = localStorage.getItem('token');

  if (!token) {
    this.router.navigate(['/login']);
    return;
  }

  this.auth.getMe().subscribe({
    next: (res) => this.user = res,
    error: () => this.router.navigate(['/login'])
  });

}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}