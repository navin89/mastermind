import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home.component',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  constructor(private apiService: ApiService) {
    this.apiService.getData().subscribe((objResult) => {
      console.log(JSON.stringify(objResult));
    })
  }
}
