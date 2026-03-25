import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AcademyContentService } from '../../features/kiosk/services/academy-content.service';

export const branchSelectedGuard: CanActivateFn = () => {
  const academyService = inject(AcademyContentService);
  const router = inject(Router);

  if (academyService.isBranchSelected()) {
    return true;
  }

  // Redirige al screen-saver sin rama seleccionada
  return router.parseUrl('/');
};
