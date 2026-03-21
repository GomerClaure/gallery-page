import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./screen-saver/pages/screen-saver-page').then(
        (module) => module.ScreenSaverPage,
      ),
  },
  {
    path: 'kiosk',
    loadComponent: () =>
      import('./kiosk-demo/pages/welcome/welcome-page.component').then(
        (module) => module.WelcomePageComponent,
      ),
  },
  {
    path: 'kiosk/grupos',
    loadComponent: () =>
      import('./kiosk-demo/pages/group-selection/group-selection-page.component').then(
        (module) => module.GroupSelectionPageComponent,
      ),
      // import('./main-menu/pages/clases-page/clases-page.component').then(
      //   (module) => module.ClasesPageComponent,
      // ),
  },
  {
    path: 'kiosk/grupos/:groupId/niveles',
    loadComponent: () =>
      import('./kiosk-demo/pages/group-levels/group-levels-page.component').then(
        (module) => module.GroupLevelsPageComponent,
      ),
  },
  {
    path: 'kiosk/grupos/:groupId/niveles/:levelId',
    loadComponent: () =>
      import('./kiosk-demo/pages/group-detail/group-detail-page.component').then(
        (module) => module.GroupDetailPageComponent,
      ),
  },
  {
    path: 'kiosk/grupos/:groupId/niveles/:levelId/eventos/:eventId',
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
