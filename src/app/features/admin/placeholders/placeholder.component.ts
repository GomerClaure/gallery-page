import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-placeholder',
  standalone: true,
  template: `
    <div class="flex items-center justify-center min-h-[50vh]">
      <div class="flex flex-col items-center text-center max-w-lg w-full
                  px-6 py-10 sm:px-8 sm:py-12 rounded-2xl
                  bg-white border border-neutral-200 shadow-sm">
        <span class="material-symbols-outlined text-6xl text-neutral-300 mb-4">{{ icon }}</span>
        <h2 class="m-0 text-xl sm:text-2xl font-extrabold text-[var(--color-text-primary)]
                   font-[var(--font-display)]">
          {{ title }}
        </h2>
        <p class="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
          Esta sección está en construcción. Aquí se implementarán las funciones
          CRUD para "{{ title }}".
        </p>
        <div class="flex items-start gap-2 mt-6 p-3.5 rounded-xl w-full
                    bg-[var(--color-primary)]/[0.06] border border-[var(--color-primary)]/15
                    text-left text-xs sm:text-sm text-[var(--color-primary-dark)]">
          <span class="material-symbols-outlined text-base shrink-0 text-[var(--color-primary)]">info</span>
          <span>Los permisos y guards están activos. La base arquitectónica está lista para iniciar desarrollo.</span>
        </div>
      </div>
    </div>
  `
})
export class PlaceholderComponent implements OnInit {
  title = 'Módulo en desarrollo';
  icon = 'construction';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data['title']) this.title = data['title'];
      if (data['icon']) this.icon = data['icon'];
    });
  }
}
