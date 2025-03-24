import { Route } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: NxWelcomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'therapienow-products',
    loadComponent: () =>
      import('@mastermind/products').then((m) => m.ProductsComponent)
  }
];
