import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  ImageSlide,
  ImageSwiperComponent,
} from '../../shared/components/image-swiper/image-swiper.component';

@Component({
  selector: 'app-screen-saver-page',
  standalone: true,
  imports: [ImageSwiperComponent],
  templateUrl: './screen-saver-page.html',
  styleUrl: './screen-saver-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenSaverPage {
  private readonly router = inject(Router);
  private readonly hostElement = inject(ElementRef<HTMLElement>);

  protected readonly slides = signal<ImageSlide[]>([
    {
      src: 'assets/screen-saver/img1.jpg',
      alt: 'Estudiantes durante una clase de la academia',
      badge: 'Clases',
    },
    {
      src: 'assets/screen-saver/img2.jpg',
      alt: 'Participantes en una presentacion academica',
      badge: 'Presentaciones',
    },
    {
      src: 'assets/screen-saver/img3.jpg',
      alt: 'Imagen institucional de la academia',
      badge: 'Institucional',
    },
    {
      src: 'assets/screen-saver/img4.jpg',
      alt: 'Actividad grupal en una clase',
      badge: 'Formacion',
    },
    {
      src: 'assets/screen-saver/img5.jpg',
      alt: 'Momento destacado de una presentacion',
      badge: 'Escenario',
    },
    {
      src: 'assets/screen-saver/img6.jpg',
      alt: 'Fotografia institucional con estudiantes',
      badge: 'Comunidad',
    },
  ]);

  constructor() {
    afterNextRender(() => {
      const screenSaverElement = this.hostElement.nativeElement.querySelector(
        '.screen-saver',
      ) as HTMLElement | null;

      screenSaverElement?.focus();
    });
  }

  protected openMenu(): void {
    void this.router.navigateByUrl('/kiosk');
  }

  protected openMenuFromKeyboard(event: KeyboardEvent): void {
    const allowedKeys = ['Enter', ' ', 'Spacebar'];

    if (!allowedKeys.includes(event.key)) {
      return;
    }

    event.preventDefault();
    this.openMenu();
  }
}
