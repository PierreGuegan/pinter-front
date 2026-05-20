import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Login</h2>

    <input [(ngModel)]="email" placeholder="email">
    <input [(ngModel)]="password" type="password" placeholder="password">

    <button (click)="login()">Login</button>

    <!-- AJOUT : navigation register -->
    <p style="margin-top: 10px;">
      Pas de compte ?
      <a (click)="goToRegister()" style="cursor:pointer; color:blue;">
        Créer un profil
      </a>
    </p>
  `
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login({ email: this.email, password: this.password })
      .subscribe((res: any) => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/feed']);
      });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}