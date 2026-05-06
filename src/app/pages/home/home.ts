import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {

  pins: string[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    console.log("HOME LOADED");

    this.api.getPins().subscribe({
      next: (data: string[]) => {
        console.log("RAILWAY:", data);
        this.pins = data;
      },
      error: (err: any) => {
        console.error("ERROR:", err);
      }
    });
  }
}