import { Component } from '@angular/core';
import { ImageService } from '../../services/imagesService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  styleUrl: './post.css',
  imports: [FormsModule, CommonModule],
  selector: 'app-post',
  template: `,
  
<div class="post-page">

  <div class="post-card">

    <h2>Create post</h2>

    <!-- IMAGE PREVIEW -->
    <div class="preview-container" *ngIf="previewUrl">
      <img [src]="previewUrl" class="preview-image" />
    </div>

    <!-- UPLOAD BUTTON -->
    <label class="upload-box">

      <input
        type="file"
        accept="image/*"
        (change)="onFileSelected($event)"
        hidden
      />

      <div class="upload-content">

        <svg viewBox="0 0 24 24" class="upload-icon">
          <path
            d="M12 16V4M7 9l5-5 5 5M5 20h14"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          />
        </svg>

        <p>Select an image</p>

      </div>

    </label>

    <!-- INPUTS -->
    <input
      [(ngModel)]="title"
      placeholder="Title"
      class="input"
    />

    <textarea
      [(ngModel)]="description"
      placeholder="Description"
      class="textarea"
    ></textarea>

    <input
  [(ngModel)]="originalArtist"
  placeholder="Original artist"
  class="input"
/>

    <!-- BUTTON -->
    <button class="post-button" (click)="upload()">
      Publish
    </button>

    <p class="message" *ngIf="message">
      {{ message }}
    </p>

  </div>

</div>
`
})
export class PostComponent {

  file!: File;
  title = '';
  description = '';
  message = '';
  originalArtist = '';

  constructor(
    private imageService: ImageService,
    private router: Router
  ) { }

  previewUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: any) {

    this.file = event.target.files[0];

    if (!this.file) return;

    const reader = new FileReader();

    reader.onload = () => {
      this.previewUrl = reader.result;
    };

    reader.readAsDataURL(this.file);
  }

  upload() {
    if (!this.file) {
      this.message = "No file selected";
      return;
    }

    this.imageService.uploadImage(
      this.file,
      this.title,
      this.description,
      this.originalArtist
    ).subscribe({
      next: () => {
        this.router.navigate(
          ['/'],
          {
            state: {
              successMessage: 'Image published successfully'
            }
          }
        );
      },
      error: () => {
        this.message = "Upload failed";
      }
    });
  }
}