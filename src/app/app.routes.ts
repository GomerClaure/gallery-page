import { Routes } from '@angular/router';
import { branchSelectedGuard } from './guards/branch-selected.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./screen-saver/pages/screen-saver-page').then(
        (module) => module.ScreenSaverPage,
      ),
  },
  {
    path: 'menu',
    canActivate: [branchSelectedGuard],
    loadComponent: () =>
      import('./kiosk-demo/pages/menu-principal/menu-principal-page.component').then(
        (module) => module.MenuPrincipalPage,
      ),
  },
  {
    path: 'grupos/:groupId/niveles',
    canActivate: [branchSelectedGuard],
    loadComponent: () =>
      import('./kiosk-demo/pages/group-levels/group-levels-page.component').then(
        (module) => module.GroupLevelsPageComponent,
      ),
  },
  {
    path: 'grupos/:groupId/niveles/:levelId',
    canActivate: [branchSelectedGuard],
    loadComponent: () =>
      import('./kiosk-demo/pages/group-detail/group-detail-page.component').then(
        (module) => module.GroupDetailPageComponent,
      ),
  },
  {
    path: 'grupos/:groupId/niveles/:levelId/eventos/:eventId',
    canActivate: [branchSelectedGuard],
    loadComponent: () =>
      import('./kiosk-demo/pages/event-detail/event-detail-page.component').then(
        (module) => module.EventDetailPageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

