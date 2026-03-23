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
import { GroupLevel } from '../../models/kiosk.models';

type SwiperContainerElement = HTMLElement & {
  initialize: () => void;
  swiper?: {
    update: () => void;
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
export class LevelsSlicer implements AfterViewInit {
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
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 0,
        stretch: -30,
        depth: 180,
        modifier: 2,
        slideShadows: false,
      },
      allowTouchMove: hasManyLevels,
      centeredSlides: true,
      grabCursor: hasManyLevels,
      loop: totalLevels >= 4,
      shortSwipes: true,
      slideToClickedSlide: true,
      slidesPerView: 'auto',
      speed: 520,
      watchSlidesProgress: true,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
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
