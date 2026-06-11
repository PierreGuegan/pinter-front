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
  this.reload();
}

ngOnInit() {
  this.reload();
    console.log("MODAL CREATED");
}

  constructor(private imageService: ImageService) {}

  loadLikes() {
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
  this.imageService.toggleLike(this.image.id).subscribe({
    next: () => {
      this.loadLikes();
      this.loadLikeState();
    }
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

reload() {
  if (!this.image?.id) return;

  this.loadLikes();
  this.loadComments();
  this.loadLikeState();
}
}