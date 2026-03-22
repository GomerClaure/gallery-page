import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AcademyContentService } from '../kiosk-demo/services/academy-content.service';

export const branchSelectedGuard: CanActivateFn = (route, state) => {
  const academyService = inject(AcademyContentService);
  const router = inject(Router);

  if (academyService.isBranchSelected()) {
    return true;
  }

  // Redirige al screen-saver sin rama seleccionada
  return router.parseUrl('/');
};
