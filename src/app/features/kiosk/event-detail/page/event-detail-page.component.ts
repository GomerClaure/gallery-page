import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ScreenContainerComponent } from '../../layout/screen-container/screen-container.component';
import { EventMediaAsset } from '../../models/kiosk.models';
import { AcademyContentService } from '../../services/academy-content.service';
import { BackButtonComponent } from '../../menu/components/back-button/back-button.component';
import { ImageSwiperComponent, ImageSlide } from '../../../../shared/ui/image-swiper/image-swiper.component';
import { EventMediaGalleryComponent } from '../components/event-media-gallery/event-media-gallery.component';
import { VideoModalComponent } from '../components/video-modal/video-modal.component';

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

  protected readonly group = computed(() => this.content.getGroup(this.groupId) ?? null);
  protected readonly level = computed(
    () => this.group()?.levels.find((level) => level.id === this.levelId) ?? null,
  );
  protected readonly event = computed(
    () => this.level()?.events.find((event) => event.id === this.eventId) ?? null,
  );
  protected readonly activeMedia = signal<EventMediaAsset | null>(null);
  protected readonly heroSlides = computed<ImageSlide[]>(() =>
    (this.event()?.media ?? [])
      .filter((item) => item.type === 'image')
      .slice(0, 4)
      .map((item) => ({
        src: item.thumbnail,
        alt: item.title,
        badge: 'Evento',
      })),
  );
  protected readonly photoCount = computed(
    () => this.event()?.media.filter((item) => item.type === 'image').length ?? 0,
  );
  protected readonly videoCount = computed(
    () => this.event()?.media.filter((item) => item.type === 'video').length ?? 0,
  );

  constructor() {
    this.content.ensureBranchSelected();
  }

  protected goBack(): void {
    const group = this.group();
    const level = this.level();
    if (!group || !level) {
      void this.router.navigateByUrl('/menu');
      return;
    }

    void this.router.navigate(['/grupos', group.id, 'niveles', level.id], {
      queryParams: { tab: 'gallery' },
    });
  }

  protected openMedia(item: EventMediaAsset): void {
    this.activeMedia.set(item);
  }

  protected closeMedia(): void {
    this.activeMedia.set(null);
  }
}
