import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { roleGuard } from '../../core/guards/role.guard';
import { guestGuard } from '../../core/guards/guest.guard';
import { AdminLayoutComponent } from '../../shared/layouts/admin-layout/admin-layout.component';

export const adminRoutes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./auth/login/login.component').then(m => m.AdminLoginComponent)
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { 
        path: 'dashboard', 
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.AdminDashboardComponent) 
      },
      // -- Content Management (Both Director and Secretaria) --
      {
        path: 'branches',
        loadComponent: () => import('./placeholders/placeholder.component').then(m => m.PlaceholderComponent),
        data: { title: 'Gestión de Sucursales', icon: 'storefront' }
      },
      {
        path: 'group-types',
        loadComponent: () => import('./placeholders/placeholder.component').then(m => m.PlaceholderComponent),
        data: { title: 'Tipos de Grupo', icon: 'category' }
      },
      {
        path: 'groups',
        loadComponent: () => import('./placeholders/placeholder.component').then(m => m.PlaceholderComponent),
        data: { title: 'Gestión de Grupos', icon: 'groups' }
      },
      {
        path: 'levels',
        loadComponent: () => import('./placeholders/placeholder.component').then(m => m.PlaceholderComponent),
        data: { title: 'Gestión de Niveles', icon: 'stairs' }
      },
      {
        path: 'teachers',
        loadComponent: () => import('./placeholders/placeholder.component').then(m => m.PlaceholderComponent),
        data: { title: 'Directorio de Profesores', icon: 'school' }
      },
      {
        path: 'dances',
        loadComponent: () => import('./placeholders/placeholder.component').then(m => m.PlaceholderComponent),
        data: { title: 'Registro de Danzas', icon: 'music_note' }
      },
      {
        path: 'events',
        loadComponent: () => import('./placeholders/placeholder.component').then(m => m.PlaceholderComponent),
        data: { title: 'Calendario de Eventos', icon: 'event' }
      },
      {
        path: 'media',
        loadComponent: () => import('./placeholders/placeholder.component').then(m => m.PlaceholderComponent),
        data: { title: 'Biblioteca Multimedia', icon: 'perm_media' }
      },
      {
        path: 'kiosk-home',
        loadComponent: () => import('./placeholders/placeholder.component').then(m => m.PlaceholderComponent),
        data: { title: 'Configuración Pantalla Principal', icon: 'devices' }
      },
      // -- Administration (Only DIRECTORS) --
      {
        path: 'users',
        canActivate: [roleGuard],
        data: { roles: ['DIRECTOR'], title: 'Usuarios del Sistema', icon: 'manage_accounts' },
        loadComponent: () => import('./placeholders/placeholder.component').then(m => m.PlaceholderComponent)
      },
      {
        path: 'settings',
        canActivate: [roleGuard],
        data: { roles: ['DIRECTOR'], title: 'Configuraciones', icon: 'settings' },
        loadComponent: () => import('./placeholders/placeholder.component').then(m => m.PlaceholderComponent)
      }
    ]
  }
];
