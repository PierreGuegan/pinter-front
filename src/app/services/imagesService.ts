import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = 'http://localhost:8080/images';

  constructor(private http: HttpClient) {}

  getImages() {
    return this.http.get<any[]>(this.apiUrl);
  }
}