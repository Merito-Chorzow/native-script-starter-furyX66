import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'create', loadComponent: () => import('./components/create-product/create-product.component').then(m => m.CreateProductComponent) },
  { path: 'product/edit/:id', loadComponent: () => import('./components/edit-product/edit-product.component').then(m => m.EditProductComponent) },
];
