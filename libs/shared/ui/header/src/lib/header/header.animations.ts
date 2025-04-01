import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


export const navbarAnimations = {
  slideInOut: trigger('slideInOut', [
    state('in', style({
      transform: 'translate3d(0, 0, 0)'
    })),
    state('out', style({
      transform: 'translate3d(100%, 0, 0)'
    })),
    transition('in => out', animate('400ms ease-in-out')),
    transition('out => in', animate('400ms ease-in-out'))
  ]),

  fadeInOut: trigger('fadeInOut', [
    state('void', style({
      opacity: 0
    })),
    transition('void <=> *', animate(200)),
  ]),

  rotate: trigger('rotate', [
    state('default', style({ transform: 'rotate(0)' })),
    state('rotated', style({ transform: 'rotate(180deg)' })),
    transition('default <=> rotated', animate('200ms ease-in'))
  ])
};
