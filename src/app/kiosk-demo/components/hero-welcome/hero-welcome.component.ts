import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Branch } from '../../models/kiosk.models';

@Component({
  selector: 'app-hero-welcome',
  standalone: true,
  templateUrl: './hero-welcome.component.html',
  styleUrl: './hero-welcome.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroWelcomeComponent {
  readonly branch = input<Branch | null>(null);
  readonly start = output<void>();
}
