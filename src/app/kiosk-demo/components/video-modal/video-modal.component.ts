import { ChangeDetectionStrategy, Component, HostListener, input, output } from '@angular/core';

import { EventMediaAsset } from '../../models/kiosk.models';

@Component({
  selector: 'app-video-modal',
  standalone: true,
  templateUrl: './video-modal.component.html',
  styleUrl: './video-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoModalComponent {
  readonly media = input<EventMediaAsset | null>(null);
  readonly closed = output<void>();

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (!this.media()) {
      return;
    }

    this.closed.emit();
  }
}
