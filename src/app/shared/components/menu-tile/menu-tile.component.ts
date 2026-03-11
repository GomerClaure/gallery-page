import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-menu-tile',
  standalone: true,
  templateUrl: './menu-tile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuTileComponent {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly image = input.required<string>();
  readonly badge = input<string>('');
  readonly actionLabel = input('Abrir');

  readonly selected = output<void>();
}
