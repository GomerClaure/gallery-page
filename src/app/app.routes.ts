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
    path: 'menu',
    loadComponent: () =>
      import('./main-menu/pages/main-menu-page').then(
        (module) => module.MainMenuPage,
      ),
  },
  {
    path: 'menu/clases',
    loadComponent: () =>
      import('./main-menu/pages/clases-page/clases-page.component').then(
        (module) => module.ClasesPageComponent,
      ),
  },
  {
    path: 'menu/clases/:id',
    loadComponent: () =>
      import('./main-menu/pages/clases-detail-page/clases-detail-page.component').then(
        (module) => module.ClasesDetailPageComponent,
      ),
  },
  {
    path: 'clases',
    redirectTo: 'menu/clases',
    pathMatch: 'full',
  },
  {
    path: 'clases/:id',
    redirectTo: 'menu/clases/:id',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
