import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  styleUrls: ['../../auth.css'],
  imports: [FormsModule],
  template: `
<div class="auth-page">

  <div class="auth-card">

    <h2>Login</h2>

    <input
      [(ngModel)]="email"
      placeholder="Email"
      class="auth-input"
    />

    <input
      [(ngModel)]="password"
      type="password"
      placeholder="Password"
      class="auth-input"
    />

    <button class="auth-button" (click)="login()">
      Login
    </button>

    <p class="auth-link">
      No account ?
      <a (click)="goToRegister()">
        Create one
      </a>
    </p>

  </div>

</div>
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

      console.log("TOKEN STORED =", this.auth.getToken());

      this.router.navigate(['/feed']);
    });
}

  goToRegister() {
    this.router.navigate(['/register']);
  }
}