import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { GroupLevel } from '../../../models/kiosk.models';

@Component({
  selector: 'app-level-card',
  standalone: true,
  templateUrl: './level-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelCardComponent {
  readonly level = input.required<GroupLevel>();
  readonly index = input(0);
  readonly selected = output<string>();
}
