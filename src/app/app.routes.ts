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
    path: '**',
    redirectTo: '',
  },
];
