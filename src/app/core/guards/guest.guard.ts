import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // If already authenticated, do not allow to visit login page
  if (authService.isAuthenticated) {
    router.navigate(['/admin/dashboard']);
    return false;
  }
  return true;
};
