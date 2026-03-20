import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Branch } from '../../models/kiosk.models';

@Component({
  selector: 'app-branch-selector-modal',
  standalone: true,
  templateUrl: './branch-selector-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchSelectorModalComponent {
  readonly branches = input.required<Branch[]>();
  readonly selectedBranchId = input<string | null>(null);
  readonly selected = output<string>();
  readonly confirmed = output<void>();
}
