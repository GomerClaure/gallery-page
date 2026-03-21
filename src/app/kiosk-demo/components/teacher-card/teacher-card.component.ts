import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { Teacher } from '../../models/kiosk.models';

@Component({
  selector: 'app-teacher-card',
  standalone: true,
  templateUrl: './teacher-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent {
  readonly teachers = input.required<Teacher[]>();

  protected readonly mainTeachers = computed(() =>
    this.teachers().filter((teacher) => this.isMain(teacher)),
  );
  protected readonly supportTeachers = computed(() =>
    this.teachers().filter((teacher) => !this.isMain(teacher)),
  );

  private isMain(teacher: Teacher): boolean {
    if (teacher.isMain) {
      return true;
    }

    const role = teacher.role.toLowerCase();
    return role.includes('principal') || role.includes('encargad');
  }
}
