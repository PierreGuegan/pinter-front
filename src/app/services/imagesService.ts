import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = `${environment.apiUrl}/images`;

  constructor(private http: HttpClient) {}

  getImages() {
    return this.http.get<any[]>(this.apiUrl);
  }

  uploadImage(file: File, title: string, description: string) {

  const formData = new FormData();

  formData.append('file', file);
  formData.append('title', title);
  formData.append('description', description);

  // RECUP JWT
  const token = localStorage.getItem('token');

  // HEADERS
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  // REQUEST
  return this.http.post(this.apiUrl, formData, { headers });
}


}