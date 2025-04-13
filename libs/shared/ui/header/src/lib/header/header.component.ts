import { Component, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { navbarAnimations } from './header.animations';
import { BreakpointObserver } from '@angular/cdk/layout';


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
    navbarAnimations.rotateOnScroll,
    navbarAnimations.rotateXOnScroll
  ],
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  rotationState = 'normal';
  lastScrollPosition = 0;
  scrollThreshold = 100; // Adjust this value for sensitivity
  isMobileView = false;
  isMenuOpen = false;

  constructor(private breakPointObserver : BreakpointObserver) {
    // EMPTY
  }

  ngOnInit() {
    this.checkViewport();
    console.log('The header component is initialized');
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkViewport();
  }

  private checkViewport(): void {
    this.isMobileView = this.breakPointObserver.isMatched('(max-width: 992px)');
    if (!this.isMobileView) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    if (this.isMobileView) {
      this.isMenuOpen = false;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const currentScrollPosition= window.scrollY;

    // Close menu if open when scrolling
    if (this.menuTrigger?.menuOpen) {
      this.menuTrigger.closeMenu();
      this.isMenuOpen = false;
      this.rotateState = 'default';
    }

    // Handle rotation animation
    if (currentScrollPosition > this.lastScrollPosition + this.scrollThreshold) {
      //scroll down
      this.rotationState = 'rotated';
      this.lastScrollPosition = currentScrollPosition;
    } else if (currentScrollPosition < this.lastScrollPosition - this.scrollThreshold) {
      //scroll up
      this.rotationState = 'normal';
      this.lastScrollPosition = currentScrollPosition;
    }
  }

  // For slideInOut animation
  menuState = 'out';

  // For rotate animation
  rotateState = 'default';

  toggleSlideInOutMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  toggleRotate() {
    this.rotateState = this.rotateState === 'default' ? 'rotated' : 'default';
  }
}
