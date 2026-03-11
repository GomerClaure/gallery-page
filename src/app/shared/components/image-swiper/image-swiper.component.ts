import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  NgZone,
  computed,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';
import type { SwiperOptions } from 'swiper/types';

export type ImageSlide = {
  src: string;
  alt: string;
  badge?: string;
};

type SwiperContainerElement = HTMLElement & {
  initialize: () => void;
  swiper?: {
    update: () => void;
  };
};

@Component({
  selector: 'app-image-swiper',
  standalone: true,
  imports: [NgClass],
  templateUrl: './image-swiper.component.html',
  styleUrl: './image-swiper.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ImageSwiperComponent implements AfterViewInit {
  readonly slides = input.required<ImageSlide[]>();
  readonly ariaLabel = input('Carrusel de imagenes');
  readonly autoplayDelay = input(5000);
  readonly loop = input(true);
  readonly effectName = input<'slide' | 'fade'>('slide');
  readonly speed = input(900);
  readonly slidesPerView = input<SwiperOptions['slidesPerView']>(1);
  readonly spaceBetween = input(0);
  readonly centeredSlides = input(false);
  readonly pagination = input(true);
  readonly navigation = input(false);
  readonly allowTouchMove = input(true);
  readonly rounded = input(false);
  readonly shadow = input(false);
  readonly breakpoints = input<SwiperOptions['breakpoints'] | undefined>(
    undefined,
  );

  private readonly swiperElement =
    viewChild.required<ElementRef<SwiperContainerElement>>('swiperElement');
  private readonly zone = inject(NgZone);

  protected readonly frameClasses = computed(() => ({
    'rounded-[2rem]': this.rounded(),
    'shadow-[0_25px_80px_rgba(41,37,36,0.18)]': this.shadow(),
  }));

  ngAfterViewInit(): void {
    const swiperElement = this.swiperElement().nativeElement;

    const config: SwiperOptions = {
      autoplay: {
        delay: this.autoplayDelay(),
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },
      allowTouchMove: this.allowTouchMove(),
      centeredSlides: this.centeredSlides(),
      effect: this.effectName(),
      fadeEffect: { crossFade: true },
      loop: this.loop(),
      navigation: this.navigation(),
      pagination: this.pagination()
        ? { clickable: true, dynamicBullets: true }
        : false,
      slidesPerView: this.slidesPerView(),
      spaceBetween: this.spaceBetween(),
      speed: this.speed(),
      breakpoints: this.breakpoints(),
    };

    this.zone.runOutsideAngular(() => {
      if (typeof swiperElement.initialize !== 'function') {
        return;
      }

      Object.assign(swiperElement, config);

      if (swiperElement.swiper) {
        swiperElement.swiper.update();
        return;
      }

      swiperElement.initialize();
    });
  }
}
