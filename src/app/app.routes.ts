import { Routes } from '@angular/router';
import { branchSelectedGuard } from './core/guards/branch-selected.guard';
import { PublicLayoutComponent } from './shared/layouts/public-layout/public-layout.component';

export const routes: Routes = [
  // -------------------------
  // ADMIN ROUTES (Protected)
  // -------------------------
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.adminRoutes)
  },

  // -------------------------
  // PUBLIC ROUTES (Kiosk)
  // -------------------------
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/screen-saver/pages/screen-saver-page.component').then(
            (module) => module.ScreenSaverPageComponent,
          ),
      },
      {
        path: 'menu',
        canActivate: [branchSelectedGuard],
        loadComponent: () =>
          import('./features/kiosk/menu/page/menu-page.component').then(
            (module) => module.MenuPageComponent,
          ),
      },
      {
        path: 'grupos/:groupId/niveles',
        canActivate: [branchSelectedGuard],
        loadComponent: () =>
          import('./features/kiosk/group-levels/page/group-levels-page.component').then(
            (module) => module.GroupLevelsPageComponent,
          ),
      },
      {
        path: 'grupos/:groupId/niveles/:levelId',
        canActivate: [branchSelectedGuard],
        loadComponent: () =>
          import('./features/kiosk/group-detail/page/group-detail-page.component').then(
            (module) => module.GroupDetailPageComponent,
          ),
      },
      {
        path: 'grupos/:groupId/niveles/:levelId/eventos/:eventId',
        canActivate: [branchSelectedGuard],
        loadComponent: () =>
          import('./features/kiosk/event-detail/page/event-detail-page.component').then(
            (module) => module.EventDetailPageComponent,
          ),
      }
    ]
  },
  
  // -------------------------
  // FALLBACK
  // -------------------------
  {
    path: '**',
    redirectTo: '',
  },
];
