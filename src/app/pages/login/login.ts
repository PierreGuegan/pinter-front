import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <div>
      <input [(ngModel)]="email" placeholder="email">
      <input [(ngModel)]="password" type="password" placeholder="password">

      <button (click)="login()">Login</button>
    </div>
  `
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/feed']);
      },
      error: () => {
        alert('Login failed');
      }
    });
  }

  //chemin vers register
  goToRegister() {
    this.router.navigate(['/register']);
  }
}