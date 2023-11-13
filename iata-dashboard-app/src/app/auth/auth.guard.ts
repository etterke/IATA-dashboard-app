import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserDetailsResponse } from '../models/auth.model';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): boolean => {
  console.log('guard befutas');
  const $authentication: Observable<UserDetailsResponse> = inject(AuthService)
    .isAuthenticatedUser()
    .pipe();
  if ($authentication) {
    return true;
  } else {
    inject(Router).navigate(['/login']);
    return false;
  }
};
