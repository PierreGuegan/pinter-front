import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

 getPins() {
  return this.http.get<string[]>(`${this.baseUrl}/pins`);
}

  createPin(pin: any) {
    return this.http.post(`${this.baseUrl}/pins`, pin);
  }
}