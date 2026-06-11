import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = `${environment.apiUrl}/api/auth`;

  private authState = new BehaviorSubject<boolean>(this.hasToken());
  authState$ = this.authState.asObservable();

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  register(data: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.authState.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.authState.next(false);
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token && token.length > 10;
  }

  getMe() {
    const token = this.getToken();

    return this.http.get(`${this.baseUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}