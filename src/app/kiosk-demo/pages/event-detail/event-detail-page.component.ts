import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { EventMediaGalleryComponent } from '../../components/event-media-gallery/event-media-gallery.component';
import { ScreenContainerComponent } from '../../components/screen-container/screen-container.component';
import { VideoModalComponent } from '../../components/video-modal/video-modal.component';
import { EventMediaAsset } from '../../models/kiosk.models';
import { AcademyContentService } from '../../services/academy-content.service';
import { ImageSwiperComponent, ImageSlide } from '../../../shared/components/image-swiper/image-swiper.component';

@Component({
  selector: 'app-event-detail-page',
  standalone: true,
  imports: [
    BackButtonComponent,
    EventMediaGalleryComponent,
    ImageSwiperComponent,
    ScreenContainerComponent,
    VideoModalComponent,
  ],
  templateUrl: './event-detail-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly content = inject(AcademyContentService);

  private readonly groupId = this.route.snapshot.paramMap.get('groupId') ?? '';
  private readonly levelId = this.route.snapshot.paramMap.get('levelId') ?? '';
  private readonly eventId = this.route.snapshot.paramMap.get('eventId') ?? '';

  protected readonly group =
    this.content.getGroup(this.groupId) ?? this.content.groups()[0];
  protected readonly level =
    this.content.getLevel(this.groupId, this.levelId) ?? this.group.levels[0];
  protected readonly event =
    this.content.getEvent(this.groupId, this.levelId, this.eventId) ??
    this.level.events[0];
  protected readonly activeVideo = signal<EventMediaAsset | null>(null);
  protected readonly heroSlides = computed<ImageSlide[]>(() =>
    this.event.media
      .filter((item) => item.type === 'image')
      .slice(0, 4)
      .map((item) => ({
        src: item.thumbnail,
        alt: item.title,
        badge: 'Evento',
      })),
  );
  protected readonly photoCount = computed(
    () => this.event.media.filter((item) => item.type === 'image').length,
  );
  protected readonly videoCount = computed(
    () => this.event.media.filter((item) => item.type === 'video').length,
  );

  constructor() {
    this.content.ensureBranchSelected();
  }

  protected goBack(): void {
    void this.router.navigate(['/grupos', this.group.id, 'niveles', this.level.id], {
      queryParams: { tab: 'gallery' },
    });
  }

  protected openVideo(item: EventMediaAsset): void {
    this.activeVideo.set(item);
  }

  protected closeVideo(): void {
    this.activeVideo.set(null);
  }
}
