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

        this.cd.detectChanges(); 
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

deleteImage(id: string) {
  this.imageService.deleteImage(id).subscribe({
    next: () => {
      this.images = this.images.filter(i => i.id !== id);
    },
    error: (err) => {
      console.error("Delete failed", err);
    }
  });
}

onDeleteImage(id: string) {

  this.imageService.deleteImage(id).subscribe({
    next: () => {
      // retire du feed
      this.images = this.images.filter(img => img.id !== id);

      // ferme modal
      this.closeModal();
    },
    error: (err) => {
      console.error("Delete failed", err);
    }
  });
}

onDeleteComment(commentId: string) {

  this.imageService.deleteComment(commentId).subscribe({
    next: () => {

      // update local modal image
      if (this.selectedImage?.comments) {
        this.selectedImage.comments =
          this.selectedImage.comments.filter((c: any) => c.id !== commentId);
      }

    },
    error: (err) => {
      console.error("Delete comment failed", err);
    }
  });
}
}