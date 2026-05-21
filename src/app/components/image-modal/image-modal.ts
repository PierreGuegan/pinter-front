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

  ngOnChanges() {
    if (this.image?.id) {
      this.loadLikes();
      this.loadComments();
    }
  }

  constructor(private imageService: ImageService) {}

  loadLikes() {
  this.imageService.getLikeCount(this.image.id).subscribe({
    next: (count) => this.likesCount = count
  });
}

toggleLike() {
  this.imageService.toggleLike(this.image.id).subscribe({
    next: () => this.loadLikes()
  });
}

loadComments() {
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
}