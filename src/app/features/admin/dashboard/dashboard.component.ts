import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="flex flex-col gap-5 sm:gap-6">

      <!-- Welcome Banner -->
      <div *ngIf="authService.currentUser() as user"
           class="relative overflow-hidden rounded-2xl px-6 py-7 sm:px-8 sm:py-8
                  bg-gradient-to-br from-[#0b1e2e] via-[#163047] to-[#1d4060] text-white">
        <!-- Decorative orb -->
        <div class="absolute w-64 h-64 -top-16 -right-10 rounded-full pointer-events-none
                    bg-[radial-gradient(circle,rgba(0,168,204,0.25),transparent_70%)]"></div>
        <div class="relative z-10">
          <h1 class="m-0 text-2xl sm:text-3xl font-extrabold tracking-tight font-[var(--font-display)]">
            Hola, {{ user.name }} 👋
          </h1>
          <p class="mt-1.5 text-base sm:text-lg text-white/70">
            Bienvenido de nuevo al panel de control BAFOTT.
          </p>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div class="flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl
                    bg-white border border-neutral-200 shadow-sm
                    hover:-translate-y-0.5 hover:shadow-md transition-all duration-150">
          <span class="material-symbols-outlined text-3xl sm:text-4xl text-[var(--color-primary)] mb-1.5">groups</span>
          <span class="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] font-[var(--font-display)] leading-none">12</span>
          <span class="mt-1 text-xs sm:text-sm font-semibold text-[var(--color-text-secondary)]">Grupos Activos</span>
        </div>
        <div class="flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl
                    bg-white border border-neutral-200 shadow-sm
                    hover:-translate-y-0.5 hover:shadow-md transition-all duration-150">
          <span class="material-symbols-outlined text-3xl sm:text-4xl text-[var(--color-secondary)] mb-1.5">storefront</span>
          <span class="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] font-[var(--font-display)] leading-none">2</span>
          <span class="mt-1 text-xs sm:text-sm font-semibold text-[var(--color-text-secondary)]">Sucursales</span>
        </div>
        <div class="flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl
                    bg-white border border-neutral-200 shadow-sm
                    hover:-translate-y-0.5 hover:shadow-md transition-all duration-150">
          <span class="material-symbols-outlined text-3xl sm:text-4xl text-[var(--color-accent-yellow)] mb-1.5">event</span>
          <span class="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] font-[var(--font-display)] leading-none">3</span>
          <span class="mt-1 text-xs sm:text-sm font-semibold text-[var(--color-text-secondary)]">Próximos Eventos</span>
        </div>
        <div class="flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl
                    bg-white border border-neutral-200 shadow-sm
                    hover:-translate-y-0.5 hover:shadow-md transition-all duration-150">
          <span class="material-symbols-outlined text-3xl sm:text-4xl text-[var(--color-tertiary)] mb-1.5">school</span>
          <span class="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] font-[var(--font-display)] leading-none">18</span>
          <span class="mt-1 text-xs sm:text-sm font-semibold text-[var(--color-text-secondary)]">Profesores</span>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="p-5 sm:p-6 rounded-xl bg-white border border-neutral-200 shadow-sm">
        <h2 class="m-0 mb-4 pb-3 border-b border-neutral-100 text-base font-bold
                   text-[var(--color-text-primary)] font-[var(--font-display)]">
          Accesos Rápidos
        </h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <a routerLink="/admin/groups"
             class="flex flex-col items-center gap-1.5 py-4 px-3 rounded-xl
                    bg-neutral-50 border-[1.5px] border-neutral-200 no-underline
                    text-[var(--color-text-primary)]
                    hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/[0.06]
                    hover:-translate-y-0.5 transition-all duration-150">
            <span class="material-symbols-outlined text-2xl text-[var(--color-primary)]">add_circle</span>
            <span class="text-xs sm:text-sm font-semibold text-center">Nuevo Grupo</span>
          </a>
          <a routerLink="/admin/events"
             class="flex flex-col items-center gap-1.5 py-4 px-3 rounded-xl
                    bg-neutral-50 border-[1.5px] border-neutral-200 no-underline
                    text-[var(--color-text-primary)]
                    hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/[0.06]
                    hover:-translate-y-0.5 transition-all duration-150">
            <span class="material-symbols-outlined text-2xl text-[var(--color-primary)]">calendar_add_on</span>
            <span class="text-xs sm:text-sm font-semibold text-center">Nuevo Evento</span>
          </a>
          <a routerLink="/admin/media"
             class="flex flex-col items-center gap-1.5 py-4 px-3 rounded-xl
                    bg-neutral-50 border-[1.5px] border-neutral-200 no-underline
                    text-[var(--color-text-primary)]
                    hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/[0.06]
                    hover:-translate-y-0.5 transition-all duration-150">
            <span class="material-symbols-outlined text-2xl text-[var(--color-primary)]">add_photo_alternate</span>
            <span class="text-xs sm:text-sm font-semibold text-center">Subir Media</span>
          </a>
          <a routerLink="/admin/teachers"
             class="flex flex-col items-center gap-1.5 py-4 px-3 rounded-xl
                    bg-neutral-50 border-[1.5px] border-neutral-200 no-underline
                    text-[var(--color-text-primary)]
                    hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/[0.06]
                    hover:-translate-y-0.5 transition-all duration-150">
            <span class="material-symbols-outlined text-2xl text-[var(--color-primary)]">person_add</span>
            <span class="text-xs sm:text-sm font-semibold text-center">Nuevo Profesor</span>
          </a>
        </div>
      </div>

      <!-- Activity Placeholder -->
      <div class="p-5 sm:p-6 rounded-xl bg-white border border-neutral-200 shadow-sm">
        <h2 class="m-0 mb-4 pb-3 border-b border-neutral-100 text-base font-bold
                   text-[var(--color-text-primary)] font-[var(--font-display)]">
          Actividad Reciente
        </h2>
        <div class="flex flex-col items-center justify-center gap-3 min-h-48
                    border-[1.5px] border-dashed border-neutral-300 rounded-xl bg-neutral-50">
          <span class="material-symbols-outlined text-4xl text-neutral-400">timeline</span>
          <p class="m-0 text-sm text-[var(--color-text-light)] max-w-sm text-center px-4">
            El historial de actividad se mostrará aquí cuando se implemente el sistema de logs.
          </p>
        </div>
      </div>
    </div>
  `
})
export class AdminDashboardComponent {
  authService = inject(AuthService);
}
