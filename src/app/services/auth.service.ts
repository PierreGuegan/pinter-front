import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = '/api/auth';

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  register(data: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
  console.log("TOKEN CHECK =", localStorage.getItem('token'));
  return !!localStorage.getItem('token');
}

  logout() {
    localStorage.removeItem('token');
  }

  getMe() {
  const token = this.getToken();

  return this.http.get('http://217.160.247.93/api/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

canAccessProfile(): boolean {
  const token = localStorage.getItem('token');
  return token !== null && token.length > 10;
}
}