import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';
import { URL_PATH } from '../models/url.model';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('guard befutas');
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticatedUser().pipe(
    map((loggedIn) => {
      if (loggedIn) {
        return true;
      } else {
        router.navigate([URL_PATH.ERROR]);
        return false;
      }
    }),
    catchError((err) => {
      router.navigate([URL_PATH.LOGIN]);
      return of(false);
    })
  );
};
