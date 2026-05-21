import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-image-modal',
  templateUrl: './image-modal.html',
  styleUrls: ['./image-modal.css'],
  imports: [CommonModule]
})
export class ImageModalComponent {

  @Input() image: any;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}