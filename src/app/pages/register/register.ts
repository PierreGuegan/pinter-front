import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <input [(ngModel)]="email" placeholder="email">
    <input [(ngModel)]="password" type="password" placeholder="password">
  `
})

export class RegisterComponent {

  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register({ email: this.email, password: this.password })
      .subscribe((res: any) => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/feed']);
      });
  }
}