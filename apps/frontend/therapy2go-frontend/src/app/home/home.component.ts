import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-home.component',
  imports: [
    CommonModule,
    // Angular Material
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    // Bootstrap
    NgbCollapseModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  isMenuCollapsed = false;
  services = [];
  faqs = [];
  testimonials = [];

  constructor(private apiService: ApiService, private logger: NGXLogger ) {
    this.apiService.getProductData()
      .subscribe((result) => {
          this.logger.info(`products received successfully with payload:: ${JSON.stringify(result)}`);
      });
  }

  ngOnInit(): void {
    this.logger.info('Home component loaded');
  }
}

