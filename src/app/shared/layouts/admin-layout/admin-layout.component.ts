import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent {
  authService = inject(AuthService);
  router = inject(Router);

  sidebarOpen = signal(false);

  get isDirector(): boolean {
    return this.authService.userRole === 'DIRECTOR';
  }

  toggleSidebar() {
    this.sidebarOpen.update(v => !v);
  }

  closeSidebar() {
    this.sidebarOpen.set(false);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
