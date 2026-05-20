import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <input [(ngModel)]="username" placeholder="username">
    <input [(ngModel)]="email" placeholder="email">
    <input [(ngModel)]="password" type="password" placeholder="password">

    <button (click)="register()">Register</button>
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
}