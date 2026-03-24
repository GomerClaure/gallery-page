import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { LevelEvent } from '../../models/kiosk.models';

@Component({
  selector: 'app-media-grid',
  standalone: true,
  templateUrl: './media-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaGridComponent {
  readonly events = input.required<LevelEvent[]>();
  readonly eventSelected = output<string>();
  readonly hasHorizontalScroll = computed(() => this.events().length > 1);

  protected photoCount(event: LevelEvent): number {
    return event.media.filter((item) => item.type === 'image').length;
  }

  protected videoCount(event: LevelEvent): number {
    return event.media.filter((item) => item.type === 'video').length;
  }
}
