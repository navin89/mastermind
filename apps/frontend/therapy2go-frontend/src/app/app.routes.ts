import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {TherapienowFormComponent} from '@mastermind/therapienow-form';


export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'services',
    component: HomeComponent,
  },
  {
    path: 'therapienow-products',
    loadComponent: () =>
      import('libs/products/src').then((m) => m.ProductsComponent)
  },
  {
    path: 'therapienow-form',
    component: TherapienowFormComponent
  },
];
