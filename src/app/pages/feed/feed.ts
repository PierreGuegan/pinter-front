import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../services/imagesService';
import { ImageModalComponent } from '../../components/image-modal/image-modal';

@Component({
  standalone: true,
  selector: 'app-feed',
  templateUrl: './feed.html',
  styleUrls: ['./feed.css'],
  imports: [CommonModule, ImageModalComponent]
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

  onError(img: any) {
  console.warn("IMAGE FAILED:", img);
}

selectedImage: any = null;
isModalOpen = false;

openModal(img: any) {
  this.selectedImage = img;
  this.isModalOpen = true;
}

closeModal() {
  this.isModalOpen = false;
  this.selectedImage = null;
}

}