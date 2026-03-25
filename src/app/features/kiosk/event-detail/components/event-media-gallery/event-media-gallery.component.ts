import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { EventMediaAsset } from '../../../models/kiosk.models';

@Component({
  selector: 'app-event-media-gallery',
  standalone: true,
  templateUrl: './event-media-gallery.component.html',
  styleUrl: './event-media-gallery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventMediaGalleryComponent {
  readonly media = input.required<EventMediaAsset[]>();
  readonly mediaSelected = output<EventMediaAsset>();

  protected readonly orderedSizes = ['media-card--lg', 'media-card--md', 'media-card--sm'];
}
