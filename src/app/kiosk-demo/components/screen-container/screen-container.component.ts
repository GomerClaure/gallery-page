import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IdleReturnHomeDirective } from '../../../shared/directives/idle-return-home.directive';

@Component({
  selector: 'app-screen-container',
  standalone: true,
  imports: [IdleReturnHomeDirective],
  templateUrl: './screen-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenContainerComponent {
  readonly eyebrow = input<string>('');
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  readonly compact = input(false);
  readonly idleMs = input(30000);
}
