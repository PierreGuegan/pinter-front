import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageService } from '../../services/imagesService';

interface ImageDto {
  id: string;
  title: string;
  description: string;
  url: string;
  originalArtist: string;
  owner?: {
    id: string;
    username: string;
  };
}

@Component({
  standalone: true,
  selector: 'app-search',
  imports: [FormsModule],
  template: `
    <input
      type="text"
      [(ngModel)]="query"
      (input)="onSearch()"
      placeholder="Rechercher une image..."
    />

    <div *ngFor="let img of images">
      <img [src]="img.url" width="200" />
      <h3>{{ img.title }}</h3>
      <p>{{ img.description }}</p>
      <small>{{ img.owner?.username }}</small>
    </div>
  `
})
export class SearchComponent {

  query = '';
  images: ImageDto[] = [];

  constructor(private imageService: ImageService) {}

  onSearch() {

    if (this.query.trim().length < 2) {
      this.images = [];
      return;
    }

    this.imageService.searchImages(this.query)
      .subscribe((res: ImageDto[]) => {
        this.images = res;
      });
  }
}