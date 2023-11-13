import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
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
    canActivate: [authGuard],
    children: [
      {
        path: 'content',
        loadComponent: () =>
          import('./components/content/content.component').then(
            (m) => m.ContentComponent
          )
      },
      {
        path: 'inventory',
        loadComponent: () =>
          import('./components/inventory/inventory.component').then(
            (m) => m.InventoryComponent
          )
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./components/sales-analytics/sales-analytics.component').then(
            (m) => m.SalesAnalyticsComponent
          )
      },
      {
        path: 'user-behaviour',
        loadComponent: () =>
          import('./components/user-behaviour/user-behaviour.component').then(
            (m) => m.UserBehaviourComponent
          )
      }
    ]
  },
  {
    path: 'navigation',
    loadComponent: () =>
      import('./components/header/header.component').then(
        (m) => m.HeaderComponent
      )
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
