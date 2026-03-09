import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';

export type CarouselItem = {
  src: string;
  alt: string;
  category: string;
};

@Component({
  selector: 'app-event-carousel',
  standalone: true,
  templateUrl: './event-carousel.html',
  styleUrl: './event-carousel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCarouselComponent {
  readonly items = input.required<CarouselItem[]>();
  readonly intervalMs = input(4500);
  readonly showIndicators = input(true);

  protected readonly activeIndex = signal(0);
  protected readonly totalItems = computed(() => this.items().length);

  private touchStartX = 0;

  constructor() {
    effect((onCleanup) => {
      const totalItems = this.totalItems();
      const intervalMs = this.intervalMs();

      if (totalItems <= 1) {
        this.activeIndex.set(0);
        return;
      }

      this.activeIndex.update((currentIndex) => currentIndex % totalItems);

      const intervalId = window.setInterval(() => {
        this.goToNext();
      }, intervalMs);

      onCleanup(() => window.clearInterval(intervalId));
    });
  }

  protected select(index: number): void {
    this.activeIndex.set(index);
  }

  protected onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0]?.clientX ?? 0;
  }

  protected onTouchEnd(event: TouchEvent): void {
    const touchEndX = event.changedTouches[0]?.clientX ?? this.touchStartX;
    const deltaX = touchEndX - this.touchStartX;

    if (Math.abs(deltaX) < 40) {
      return;
    }

    if (deltaX < 0) {
      this.goToNext();
      return;
    }

    this.goToPrevious();
  }

  private goToNext(): void {
    const totalItems = this.totalItems();

    if (totalItems < 2) {
      return;
    }

    this.activeIndex.update((currentIndex) => (currentIndex + 1) % totalItems);
  }

  private goToPrevious(): void {
    const totalItems = this.totalItems();

    if (totalItems < 2) {
      return;
    }

    this.activeIndex.update(
      (currentIndex) => (currentIndex - 1 + totalItems) % totalItems,
    );
  }
}
