import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { InterestGroup } from '../../models/kiosk.models';

@Component({
  selector: 'app-group-card',
  standalone: true,
  templateUrl: './group-card.component.html',
  styleUrl: './group-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupCardComponent {
  readonly group = input.required<InterestGroup>();
  readonly selected = output<string>();
}
