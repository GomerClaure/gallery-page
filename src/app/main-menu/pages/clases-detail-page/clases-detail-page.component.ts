import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import type { SwiperOptions } from 'swiper/types';

import { danceClasses } from '../../data/classes.data';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { ImageSwiperComponent } from '../../../shared/components/image-swiper/image-swiper.component';
import { IdleReturnHomeDirective } from '../../../shared/directives/idle-return-home.directive';

@Component({
  selector: 'app-clases-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    ImageSwiperComponent,
    IdleReturnHomeDirective,
  ],
  templateUrl: './clases-detail-page.component.html',
  styleUrl: './clases-detail-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClasesDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly classId = this.route.snapshot.paramMap.get('id') ?? '';

  protected readonly danceClass =
    danceClasses.find((danceClass) => danceClass.id === this.classId) ??
    danceClasses[0];

  protected readonly environmentSlides = computed(() =>
    this.danceClass.environmentImages.map((src, index) => ({
      src,
      alt: `${this.danceClass.name} ambiente ${index + 1}`,
      badge: 'Ambientes',
    })),
  );

  protected readonly danceSlides = computed(() =>
    Array.from({ length: 4 }, (_, groupIndex) =>
      this.danceClass.dances.map((dance, danceIndex) => ({
        key: `${dance}-${groupIndex}-${danceIndex}`,
        label: dance,
      })),
    ).flat(),
  );

  protected readonly danceCarouselBreakpoints: SwiperOptions['breakpoints'] = {
    0: {
      slidesPerView: 1.4,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 2.6,
      spaceBetween: 12,
    },
    768: {
      slidesPerView: 3.2,
      spaceBetween: 14,
    },
    1280: {
      slidesPerView: 2.8,
      spaceBetween: 14,
    },
  };
}
