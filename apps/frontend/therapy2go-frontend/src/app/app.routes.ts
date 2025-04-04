import { Route } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: NxWelcomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'therapienow-products',
    loadComponent: () =>
      import('libs/products/src').then((m) => m.ProductsComponent)
  }
];
