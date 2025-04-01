import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { navbarAnimations } from './header.animations';

@Component({
  selector: 'lib-angular-header',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    RouterLink,
    CommonModule,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None,
  animations: [
    navbarAnimations.fadeInOut,
    navbarAnimations.rotate,
    navbarAnimations.fadeInOut,
  ],
})
export class HeaderComponent {
  // For slideInOut animation
  menuState = 'out';

  // For rotate animation
  rotateState = 'default';

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  toggleRotate() {
    this.rotateState = this.rotateState === 'default' ? 'rotated' : 'default';
  }
}
