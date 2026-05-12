import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../services/imagesService';

@Component({
  standalone: true,
  selector: 'app-feed',
  templateUrl: './feed.html',
  styleUrls: ['./feed.css'],
  imports: [CommonModule]
})
export class FeedComponent implements OnInit {

  images: any[] = [];

  constructor(
    private imageService: ImageService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log("FEED LOADED");

    this.imageService.getImages().subscribe({
      next: (data) => {
        console.log("DATA =", data);

        this.images = [...(data || [])];

        console.log("IMAGES =", this.images);

        this.cd.detectChanges(); // 🔥 force Angular refresh
      },
      error: (err) => {
        console.error("ERROR =", err);
      }
    });
  }
}