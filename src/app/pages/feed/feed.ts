import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../services/imagesService';

@Component({
  standalone: true,
  selector: 'app-feed',
  templateUrl: './feed.html',
  imports: [CommonModule]
})
export class FeedComponent implements OnInit {

  image: any = null;

  constructor(
    private imageService: ImageService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log("COMPONENT LOADED");

    // TEST 1 : voir si API répond
    this.imageService.getImages().subscribe({
      next: (data) => {
        console.log("DATA =", data);

        if (!data || data.length === 0) {
          console.warn("NO DATA RECEIVED");
          return;
        }

        // force Angular update propre
        this.image = data[0];

        console.log("IMAGE =", this.image);

        // 🔥 force refresh UI (important debug Angular)
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error("ERROR =", err);
      }
    });
  }
}