import {
  Directive,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appIdleReturnHome]',
  standalone: true,
  host: {
    '(document:pointerdown)': 'registerActivity()',
    '(document:pointermove)': 'registerActivity()',
    '(document:keydown)': 'registerActivity()',
    '(document:touchstart)': 'registerActivity()',
  },
})
export class IdleReturnHomeDirective {
  readonly idleMs = input(30000, { alias: 'appIdleReturnHome' });
  readonly redirectTo = input('/', { alias: 'appIdleReturnTarget' });

  private readonly router = inject(Router);
  private readonly lastActivityAt = signal(Date.now());
  private readonly inactivityDeadline = computed(
    () => this.lastActivityAt() + this.idleMs(),
  );

  constructor() {
    effect((onCleanup) => {
      this.inactivityDeadline();

      const timeoutId = window.setTimeout(() => {
        void this.router.navigateByUrl(this.redirectTo());
      }, this.idleMs());

      onCleanup(() => window.clearTimeout(timeoutId));
    });
  }

  registerActivity(): void {
    this.lastActivityAt.set(Date.now());
  }
}
