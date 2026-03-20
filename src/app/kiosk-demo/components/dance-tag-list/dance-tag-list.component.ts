import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-dance-tag-list',
  standalone: true,
  templateUrl: './dance-tag-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DanceTagListComponent {
  readonly dances = input.required<string[]>();
}
