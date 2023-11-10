import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      )
  },
  {
    path: 'navigation',
    loadComponent: () =>
      import('./header/header.component').then((m) => m.HeaderComponent),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./login/login.component').then((m) => m.LoginComponent)
      }
    ]
  },
  {
    path: 'content',
    loadComponent: () =>
      import('./content/content.component').then((m) => m.ContentComponent)
  }
];
