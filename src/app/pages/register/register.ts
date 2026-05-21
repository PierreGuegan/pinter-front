import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['../../auth.css'],
  template: `
<div class="auth-page">

  <div class="auth-card">

    <h2>Create account</h2>

    <input
      [(ngModel)]="username"
      placeholder="Username"
      class="auth-input"
    />

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

    <button class="auth-button" (click)="register()">
      Register
    </button>

    <p class="auth-link">
      Already have an account ?
      <a (click)="goToLogin()">
        Login
      </a>
    </p>

  </div>

</div>
`
})
export class RegisterComponent {

  username = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {

  this.auth.register({
    username: this.username,
    email: this.email,
    password: this.password
  })
  .subscribe(() => {

    this.auth.login({
      email: this.email,
      password: this.password
    })
    .subscribe((res: any) => {

      this.auth.saveToken(res.token);

      this.router.navigate(['/profile']);

    });

  });

}

goToLogin() {
  this.router.navigate(['/login']);
}
}