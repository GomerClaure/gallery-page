import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  NgZone,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import type { SwiperOptions } from 'swiper/types';
import { GroupLevel } from '../../../models/kiosk.models';

type SwiperContainerElement = HTMLElement & {
  initialize: () => void;
  swiper?: {
    update: () => void;
    destroy?: (deleteInstance?: boolean, cleanStyles?: boolean) => void;
  };
};

@Component({
  selector: 'app-levels-slider',
  standalone: true,
  templateUrl: './levels-slider.component.html',
  styleUrl: './levels-slider.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LevelsSliderComponent implements AfterViewInit {
  private readonly zone = inject(NgZone);
  private readonly levelsSwiper =
    viewChild.required<ElementRef<SwiperContainerElement>>('levelsSwiper');

  readonly levels = input.required<GroupLevel[]>();
  readonly levelSelected = output<string>();

  ngAfterViewInit(): void {
    const swiperElement = this.levelsSwiper().nativeElement;
    const totalLevels = this.levels().length;
    const hasManyLevels = totalLevels > 1;

    const config: SwiperOptions = {
      allowTouchMove: hasManyLevels,
      grabCursor: hasManyLevels,
      shortSwipes: true,
      slideToClickedSlide: true,
      speed: 420,
      watchSlidesProgress: true,
      observer: true,
      observeParents: true,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },

      slidesPerView: 1.15,
      spaceBetween: 14,
      centeredSlides: true,
      loop: false,

      breakpoints: {
        0: {
          slidesPerView: 1.15,
          spaceBetween: 14,
          centeredSlides: true,
          loop: false,
          effect: 'slide',
        },
        480: {
          slidesPerView: 1.35,
          spaceBetween: 16,
          centeredSlides: true,
          loop: false,
          effect: 'slide',
        },
        700: {
          slidesPerView: 2.1,
          spaceBetween: 20,
          centeredSlides: totalLevels <= 2,
          loop: false,
          effect: 'slide',
        },
        960: {
          slidesPerView: Math.min(totalLevels, 3),
          spaceBetween: 24,
          centeredSlides: totalLevels < 3,
          loop: false,
          effect: 'slide',
        },
        1280: {
          slidesPerView: Math.min(totalLevels, 4),
          spaceBetween: 28,
          centeredSlides: totalLevels < 4,
          loop: false,
          effect: 'slide',
        },
      },

      pagination: hasManyLevels
        ? {
            clickable: true,
            dynamicBullets: true,
          }
        : false,
    };

    this.zone.runOutsideAngular(() => {
      if (typeof swiperElement.initialize !== 'function') return;

      Object.assign(swiperElement, config);

      if (swiperElement.swiper) {
        swiperElement.swiper.update();
        return;
      }

      swiperElement.initialize();
    });
  }

  protected levelOrder(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  protected selectLevel(levelId: string): void {
    this.levelSelected.emit(levelId);
  }
}
