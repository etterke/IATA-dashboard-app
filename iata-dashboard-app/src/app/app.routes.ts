import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { URL_PATH } from './models/url.model';

export const routes: Routes = [
  {
    path: URL_PATH.LOGIN,
    loadComponent: () =>
      import('./components/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: URL_PATH.DASHBOARD,
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard],
    children: [
      {
        path: URL_PATH.CONTENT,
        loadComponent: () =>
          import('./components/content/content.component').then(
            (m) => m.ContentComponent
          )
      },
      {
        path: URL_PATH.INVENTORY,
        loadComponent: () =>
          import('./components/inventory/inventory.component').then(
            (m) => m.InventoryComponent
          )
      },
      {
        path: URL_PATH.ANALYTICS,
        loadComponent: () =>
          import('./components/sales-analytics/sales-analytics.component').then(
            (m) => m.SalesAnalyticsComponent
          )
      },
      {
        path: URL_PATH.USER_BEHAVIOUR,
        loadComponent: () =>
          import('./components/user-behaviour/user-behaviour.component').then(
            (m) => m.UserBehaviourComponent
          )
      }
    ]
  },
  {
    path: URL_PATH.NAVIGATION,
    loadComponent: () =>
      import('./components/header/header.component').then(
        (m) => m.HeaderComponent
      )
  },
  {
    path: URL_PATH.ERROR,
    loadComponent: () =>
      import('./components/error/error.component').then((m) => m.ErrorComponent)
  },
  { path: URL_PATH.EMPTY, redirectTo: URL_PATH.LOGIN, pathMatch: 'full' }
];
