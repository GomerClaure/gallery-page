import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Branch, GroupLevel, InterestGroup } from '../../models/kiosk.models';

@Component({
  selector: 'app-group-sidebar',
  standalone: true,
  templateUrl: './group-sidebar.component.html',
  styleUrl: './group-sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupSidebarComponent {
  readonly branch = input<Branch | null>(null);
  readonly group = input.required<InterestGroup>();
  readonly level = input.required<GroupLevel>();
}
