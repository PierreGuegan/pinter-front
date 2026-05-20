import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="user; else notLogged">

      <h2>Mon profil</h2>

      <!-- AJOUT : infos user -->
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>

      <button (click)="logout()">Déconnexion</button>

    </div>

    <ng-template #notLogged>
      <h2>Profil</h2>

      <p>Vous n'êtes pas connecté</p>

      <button (click)="goToLogin()">Login</button>
      <button (click)="goToRegister()">Register</button>
    </ng-template>
  `
})
export class ProfileComponent {

  user: any = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.auth.getMe().subscribe({
        next: (u) => this.user = u,
        error: () => this.user = null
      });
    }
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