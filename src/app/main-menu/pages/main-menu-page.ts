import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu-page',
  standalone: true,
  templateUrl: './main-menu-page.html',
  styleUrl: './main-menu-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:pointerdown)': 'registerActivity()',
    '(document:pointermove)': 'registerActivity()',
    '(document:keydown)': 'registerActivity()',
    '(document:touchstart)': 'registerActivity()',
  },
})
export class MainMenuPage {
  private readonly router = inject(Router);
  private readonly inactivityMs = 30000;

  protected readonly menuItems = [
    {
      title: 'Clases',
      description: 'Consulta actividades, horarios y espacios de formacion.',
    },
    {
      title: 'Presentaciones',
      description: 'Explora muestras, ensayos y eventos destacados.',
    },
    {
      title: 'Institucional',
      description: 'Accede a informacion general y contenidos de bienvenida.',
    },
  ];

  private readonly lastActivityAt = signal(Date.now());
  protected readonly inactivityDeadline = computed(
    () => this.lastActivityAt() + this.inactivityMs,
  );

  constructor() {
    effect((onCleanup) => {
      this.inactivityDeadline();

      const timeoutId = window.setTimeout(() => {
        void this.router.navigateByUrl('/');
      }, this.inactivityMs);

      onCleanup(() => window.clearTimeout(timeoutId));
    });
  }

  protected registerActivity(): void {
    this.lastActivityAt.set(Date.now());
  }
}
