import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../services/imagesService';
import { FormsModule } from '@angular/forms';
import { OnChanges, SimpleChanges } from '@angular/core';


@Component({
  standalone: true,
  selector: 'app-image-modal',
  templateUrl: './image-modal.html',
  styleUrls: ['./image-modal.css'],
  imports: [CommonModule, FormsModule]
})
export class ImageModalComponent implements OnChanges{

  @Input() image: any;
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

  this.imageService.getLikeCount(this.image.id).subscribe({
    next: (count) => this.likesCount = count
  });
}

loadLikeState() {
  this.imageService.isLikedByMe(this.image.id).subscribe({
    next: (res: boolean) => {
      this.isLiked = res;
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
  if (!this.image?.id) return;

  this.loadLikes();
  this.loadComments();
  this.loadLikeState();
}

ngOnChanges(changes: SimpleChanges) {
  if (changes['image'] && this.image?.id) {
    this.resetState();   // 👈 ajout
    this.reload();
  }
}

resetState() {
  this.likesCount = 0;
  this.comments = [];
  this.isLiked = false;
}
}