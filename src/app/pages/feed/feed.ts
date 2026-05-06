import { Component, HostListener, OnInit } from '@angular/core';
import { ImageService } from '../../services/imagesService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.html',
  styleUrls: ['./feed.css'],
  imports: [CommonModule]
})
export class FeedComponent implements OnInit {

  images: any[] = [];
  displayedImages: any[] = [];

  batchSize = 10;
  currentIndex = 0;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.imageService.getImages().subscribe(data => {
      this.images = data;
      this.loadMore();
    });
  }

  loadMore() {
    const nextBatch = this.images.slice(
      this.currentIndex,
      this.currentIndex + this.batchSize
    );

    this.displayedImages.push(...nextBatch);
    this.currentIndex += this.batchSize;
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 300;

    if (scrollPosition >= threshold) {
      this.loadMore();
    }
  }
}