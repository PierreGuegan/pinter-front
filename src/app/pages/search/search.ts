import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageService } from '../../services/imagesService';

@Component({
  standalone: true,
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent {

  query = '';
  images: any[] = [];

  constructor(private imageService: ImageService) {}

  onSearch() {

    if (this.query.trim().length < 2) {
      this.images = [];
      return;
    }

    this.imageService.searchImages(this.query)
      .subscribe({
        next: (res) => {
          this.images = res;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
}