import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


export const navbarAnimations = {
  rotateOnScroll: trigger('rotateOnScroll', [
    state('normal', style({
      transform: 'rotate(0deg)'
    })),
    state('rotated', style({
      transform: 'rotate(360deg)'
    })),
    transition('normal => rotated', [
      animate('0.5s ease-in-out')
    ]),
    transition('rotated => normal', [
      animate('0.5s ease-in-out')
    ])
  ]),

  rotateXOnScroll: trigger('rotateXOnScroll', [
    state('normal', style({
      transform: 'rotateX(0deg)',
      'transform-origin': 'top center'
    })),
    state('rotated', style({
      transform: 'rotateX(180deg)',
      'transform-origin': 'top center'
    })),
    transition('normal => rotated', [
      animate('0.5s ease-in-out')
    ]),
    transition('rotated => normal', [
      animate('0.5s ease-in-out')
    ])
  ]),

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
  ]),


  slideDown: trigger('slideDown', [
    transition(':enter', [
      style({ height: 0, opacity: 0, overflow: 'hidden' }),
      animate('300ms ease-out', style({ height: '*', opacity: 1 }))
    ]),
    transition(':leave', [
      style({ height: '*', opacity: 1, overflow: 'hidden' }),
      animate('300ms ease-in', style({ height: 0, opacity: 0 }))
    ])
  ])
};


