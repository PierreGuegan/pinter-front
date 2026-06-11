import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../services/imagesService';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-image-modal',
  templateUrl: './image-modal.html',
  styleUrls: ['./image-modal.css'],
  imports: [CommonModule, FormsModule]
})
export class ImageModalComponent {

  private _image: any;

  @Input() set image(value: any) {
    this._image = value;

    if (value?.id) {
      setTimeout(() => {
        this.reload();
      });
    }
  }

  get image() {
    return this._image;
  }

  @Output() close = new EventEmitter<void>();
  @Output() delete = new EventEmitter<string>();

  closeModal() {
    this.close.emit();
  }

  deleteImage() {
    this.delete.emit(this.image.id);
  }

  likesCount: number = 0;
  comments: any[] = [];
  newComment: string = '';
  isLiked: boolean = false;

  constructor(private imageService: ImageService) {}

  loadLikes() {
    if (!this.image?.id) return;

    console.log("LOAD LIKES FOR", this.image.id);

    this.imageService.getLikeCount(this.image.id).subscribe({
      next: (count) => {
        console.log("LIKE COUNT RECEIVED =", count);
        this.likesCount = count;
      }
    });
  }

  loadLikeState() {
    if (!this.image?.id) return;

    console.log("LOAD LIKE STATE FOR", this.image.id);

    this.imageService.isLikedByMe(this.image.id).subscribe({
      next: (res) => {
        console.log("IS LIKED RECEIVED =", res);
        this.isLiked = res;
      },
      error: (err) => {
        console.error("IS LIKED ERROR =", err);
      }
    });
  }

  toggleLike() {
    const previous = this.isLiked;

    // optimistic UI
    this.isLiked = !previous;
    this.likesCount += previous ? -1 : 1;

    this.imageService.toggleLike(this.image.id).subscribe({
      next: () => {
        this.loadLikes();
        this.loadLikeState();
      },
      error: () => {
        // rollback si erreur
        this.isLiked = previous;
        this.loadLikes();
      }
    });
  }

  loadComments() {
    if (!this.image?.id) return;

    this.imageService.getComments(this.image.id).subscribe({
      next: (data) => this.comments = data
    });
  }

  addComment() {
    if (!this.newComment.trim()) return;

    this.imageService.addComment(this.image.id, this.newComment).subscribe({
      next: () => {
        this.newComment = '';
        this.loadComments();
      }
    });
  }

  reload() {
    console.log("RELOAD CALLED");
    console.log("IMAGE =", this.image);

    if (!this.image?.id) {
      console.log("NO IMAGE ID");
      return;
    }

    this.loadLikes();
    this.loadComments();
    this.loadLikeState();
  }

  resetState() {
    this.likesCount = 0;
    this.comments = [];
    this.isLiked = false;
  }
}