import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const allowedRoles = route.data['roles'] as Array<'DIRECTOR' | 'SECRETARIA'>;
  const userRole = authService.userRole;

  if (!userRole || (allowedRoles && !allowedRoles.includes(userRole))) {
    // Redirect to dashboard if they don't have access to specific module but are logged in
    router.navigate(['/admin/dashboard']);
    return false;
  }
  return true;
};
