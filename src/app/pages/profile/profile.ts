import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isLoggedIn(); else notLogged">

      <h2>Mon profil</h2>

      <!-- AJOUT : bouton logout -->
      <button (click)="logout()">Déconnexion</button>

    </div>

    <ng-template #notLogged>
      <p>Vous n'êtes pas connecté</p>
      <button (click)="goToLogin()">Login</button>
      <button (click)="goToRegister()">Register</button>
    </ng-template>
  `
})
export class ProfileComponent {

  constructor(private auth: AuthService, private router: Router) {}

  // check auth simple
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  //  logout
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