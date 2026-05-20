import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  template: `
    <h2>Profile</h2>

    <p *ngIf="user">
      Connecté : {{ user.email }}
    </p>
  `
})
export class ProfileComponent {

  user: any;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    const token = this.auth.getToken();
    if (token) {
      this.user = { email: 'logged-user' }; // temporaire
    }
  }
}