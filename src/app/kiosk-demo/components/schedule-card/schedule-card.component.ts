import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ScheduleSlot } from '../../models/kiosk.models';

@Component({
  selector: 'app-schedule-card',
  standalone: true,
  templateUrl: './schedule-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleCardComponent {
  readonly schedules = input.required<ScheduleSlot[]>();
}
