import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-back-button',
  standalone: true,
  templateUrl: './back-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButtonComponent {
  readonly pressed = output<void>();
}
