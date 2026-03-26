import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  template: `
    <!-- Main public content wrapper (kiosk will be rendered here) -->
    <div class="public-layout-container min-h-screen bg-slate-900 text-white">
      <router-outlet></router-outlet>
    </div>
  `,
  standalone: true,
  imports: [RouterOutlet]
})
export class PublicLayoutComponent {}
