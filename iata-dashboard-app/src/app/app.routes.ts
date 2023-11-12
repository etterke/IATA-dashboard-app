import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: []
  },
  {
    path: 'navigation',
    loadComponent: () =>
      import('./components/header/header.component').then(
        (m) => m.HeaderComponent
      )
  },
  {
    path: 'content',
    loadComponent: () =>
      import('./components/content/content.component').then(
        (m) => m.ContentComponent
      )
  }
];
