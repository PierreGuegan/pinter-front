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

  // =========================
  // 📌 INPUT IMAGE (IMPORTANT FIX)
  // =========================
  private _image: any;

  @Input() set image(value: any) {
    this._image = value;

    // 🔥 sécurité : si pas d'image, on stop
    if (!value?.id) return;

    // 🔥 reset état AVANT reload
    this.resetState();

    // 🔥 IMPORTANT : attend stabilisation Angular
    Promise.resolve().then(() => {
      this.reload();
    });
  }

  get image() {
    return this._image;
  }

  // =========================
  // OUTPUTS
  // =========================
  @Output() close = new EventEmitter<void>();
  @Output() delete = new EventEmitter<string>();
  @Output() deleteCommentEvent = new EventEmitter<string>();

  // =========================
  // STATE UI
  // =========================
  likesCount: number = 0;
  comments: any[] = [];
  newComment: string = '';
  isLiked: boolean = false;

  constructor(private imageService: ImageService) { }

  // =========================
  // ACTIONS UI
  // =========================
  closeModal() {
    this.close.emit();
  }

  deleteImage() {
    this.delete.emit(this.image.id);
  }

  // =========================
  // API CALLS
  // =========================
  loadLikes() {
    if (!this.image?.id) return;

    this.imageService.getLikeCount(this.image.id).subscribe({
      next: (count) => {
        this.likesCount = count;
      }
    });
  }

  loadLikeState() {
    if (!this.image?.id) return;

    this.imageService.isLikedByMe(this.image.id).subscribe({
      next: (res) => {
        this.isLiked = res;
      },
      error: (err) => {
        console.error("LIKE STATE ERROR =", err);
        this.isLiked = false;
      }
    });
  }

  toggleLike() {
    const previous = this.isLiked;

    this.isLiked = !previous;
    this.likesCount += previous ? -1 : 1;

    this.imageService.toggleLike(this.image.id).subscribe({
      next: () => {
        this.loadLikes();
        this.loadLikeState();
      },
      error: () => {
        this.isLiked = previous;
        this.loadLikes();
      }
    });
  }

  loadComments() {
    if (!this.image?.id) return;

    this.imageService.getComments(this.image.id).subscribe({
      next: (data) => {
        this.comments = data;
      }
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

  currentUserId: string = '';


  @Output() deleteComment = new EventEmitter<string>();

  deleteCommentById(commentId: string) {
    this.deleteComment.emit(commentId);
  }
  // =========================
  // CORE FIXED RELOAD
  // =========================
  reload() {
    if (!this.image?.id) return;

    this.loadLikes();
    this.loadComments();
    this.loadLikeState();
  }

  // =========================
  // RESET STATE (IMPORTANT)
  // =========================
  resetState() {
    this.likesCount = 0;
    this.comments = [];
    this.isLiked = false;
  }

}