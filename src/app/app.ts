import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private auth: AuthService, private router: Router) {}

  goProfile() {
  if (this.auth.isLoggedIn()) {
    this.router.navigate(['/profile']);
  } else {
    this.router.navigate(['/login']);
  }
}


}