import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="relative flex items-center justify-center min-h-dvh p-4 sm:p-6
                bg-gradient-to-br from-[#0b1e2e] via-[#122c40] to-[#0d2233]
                font-sans overflow-hidden">

      <!-- Decorative orbs -->
      <div class="absolute w-72 h-72 -top-20 -right-16 rounded-full
                  bg-[radial-gradient(circle,rgba(0,168,204,0.15),transparent_70%)]
                  pointer-events-none floating-orb"></div>
      <div class="absolute w-56 h-56 -bottom-14 -left-10 rounded-full
                  bg-[radial-gradient(circle,rgba(229,57,53,0.1),transparent_70%)]
                  pointer-events-none floating-orb-delayed"></div>

      <!-- Login Card -->
      <div class="relative w-full max-w-md rounded-2xl overflow-hidden bg-white
                  shadow-2xl shadow-black/25">

        <!-- Header -->
        <div class="flex flex-col items-center px-6 pt-10 pb-6
                    bg-gradient-to-b from-[#f8fcfd] to-white">
          <img src="assets/logo-bafott.png" alt="BAFOTT"
               class="w-20 h-20 sm:w-24 sm:h-24 object-contain mb-4
                      drop-shadow-[0_8px_20px_rgba(0,168,204,0.2)]">
          <h1 class="m-0 text-2xl sm:text-[1.5rem] font-extrabold tracking-tight
                     text-[var(--color-text-primary)] font-[var(--font-display)]">
            Panel Administrativo
          </h1>
          <p class="mt-1 text-sm text-[var(--color-text-secondary)]">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        <!-- Accent bar -->
        <div class="flex h-[3px]">
          <span class="flex-1 bg-[var(--color-accent-red)]"></span>
          <span class="flex-1 bg-[var(--color-accent-yellow)]"></span>
          <span class="flex-1 bg-[var(--color-accent-green)]"></span>
        </div>

        <!-- Form -->
        <div class="px-6 sm:px-8 py-7">
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">

            <!-- Error -->
            <div *ngIf="errorMessage()"
                 class="flex items-center gap-2 px-3.5 py-3 rounded-xl
                        bg-[var(--color-accent-red)]/8 border border-[var(--color-accent-red)]/20
                        text-[var(--color-tertiary)] text-sm font-medium">
              <span class="material-symbols-outlined text-lg shrink-0">error</span>
              {{ errorMessage() }}
            </div>

            <!-- Email -->
            <div class="flex flex-col gap-1">
              <label for="email"
                     class="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                Correo Electrónico
              </label>
              <input id="email" type="email" formControlName="email"
                     placeholder="director@admin.com"
                     class="px-3.5 py-2.5 rounded-xl border-[1.5px] border-neutral-200
                            bg-neutral-50 text-sm text-[var(--color-text-primary)]
                            placeholder:text-[var(--color-text-light)]
                            focus:outline-none focus:border-[var(--color-primary)]
                            focus:ring-[3px] focus:ring-[var(--color-primary)]/12
                            transition-[border-color,box-shadow] duration-150">
            </div>

            <!-- Password -->
            <div class="flex flex-col gap-1">
              <label for="password"
                     class="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                Contraseña
              </label>
              <input id="password" type="password" formControlName="password"
                     placeholder="••••••••"
                     class="px-3.5 py-2.5 rounded-xl border-[1.5px] border-neutral-200
                            bg-neutral-50 text-sm text-[var(--color-text-primary)]
                            placeholder:text-[var(--color-text-light)]
                            focus:outline-none focus:border-[var(--color-primary)]
                            focus:ring-[3px] focus:ring-[var(--color-primary)]/12
                            transition-[border-color,box-shadow] duration-150">
            </div>

            <!-- Submit -->
            <button type="submit" [disabled]="loginForm.invalid || isLoading()"
                    class="flex items-center justify-center py-2.5 rounded-xl border-0
                           bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary-dark)]
                           text-white text-[0.95rem] font-bold cursor-pointer
                           shadow-[0_8px_20px_rgba(0,168,204,0.25)]
                           hover:translate-y-[-1px] hover:shadow-[0_12px_24px_rgba(0,168,204,0.32)]
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
                           transition-all duration-150">
              <span *ngIf="!isLoading()">Acceder</span>
              <span *ngIf="isLoading()" class="flex items-center gap-1.5">
                <span class="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                Verificando...
              </span>
            </button>

            <p class="mt-1 text-xs text-center text-[var(--color-text-light)] leading-relaxed">
              Demo: <strong class="text-[var(--color-text-secondary)]">director&#64;admin.com</strong>
              o <strong class="text-[var(--color-text-secondary)]">secretaria&#64;admin.com</strong><br>
              Cualquier contraseña
            </p>
          </form>
        </div>
      </div>
    </div>
  `
})
export class AdminLoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  isLoading = signal(false);
  errorMessage = signal('');

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    const { email, password } = this.loginForm.getRawValue();
    const success = await this.authService.login(email!, password!);

    this.isLoading.set(false);

    if (success) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.errorMessage.set('Credenciales inválidas. Usa director@admin.com o secretaria@admin.com');
    }
  }
}
