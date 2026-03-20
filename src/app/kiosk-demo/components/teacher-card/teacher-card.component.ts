import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Teacher } from '../../models/kiosk.models';

@Component({
  selector: 'app-teacher-card',
  standalone: true,
  templateUrl: './teacher-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent {
  readonly teacher = input.required<Teacher>();
}
