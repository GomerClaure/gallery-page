import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { DetailTab } from '../../models/kiosk.models';

interface TabItem {
  id: DetailTab;
  label: string;
}

@Component({
  selector: 'app-tab-navigation',
  standalone: true,
  templateUrl: './tab-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabNavigationComponent {
  readonly tabs = input.required<TabItem[]>();
  readonly activeTab = input.required<DetailTab>();
  readonly tabChanged = output<DetailTab>();
}
