import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth service/auth.service';
import { catchError, tap, of } from 'rxjs';
import { URL_PATH } from '../models/url.model';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('guard befutas');
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticatedUser.pipe(
    tap((value) => {
      if (value) {
        return true;
      } else {
        alert(
          'You have not yet signed up, you are being navigated to the sign up page'
        );
        router.navigate([URL_PATH.REGISTRATION]);
        return false;
      }
    }),
    catchError((err) => {
      router.navigate([URL_PATH.ERROR]);
      return of(false);
    })
  );
};
