import { Component } from '@angular/core';
import { ImageService } from '../../services/imagesService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-post',
  template: `
    <h2>Upload image</h2>

    <input type="file" (change)="onFileSelected($event)" />

    <input [(ngModel)]="title" placeholder="title" />
    <input [(ngModel)]="description" placeholder="description" />

    <button (click)="upload()">Post</button>

    <p *ngIf="message">{{ message }}</p>
  `
})
export class PostComponent {

  file!: File;
  title = '';
  description = '';
  message = '';

  constructor(private imageService: ImageService) {}

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  upload() {
    if (!this.file) {
      this.message = "No file selected";
      return;
    }

    this.imageService.uploadImage(
      this.file,
      this.title,
      this.description
    ).subscribe({
      next: () => {
        this.message = "Upload success";
      },
      error: () => {
        this.message = "Upload failed";
      }
    });
  }
}