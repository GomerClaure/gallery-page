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
  CarouselItem,
  EventCarouselComponent,
} from '../components/event-carousel/event-carousel';

@Component({
  selector: 'app-screen-saver-page',
  standalone: true,
  imports: [EventCarouselComponent],
  templateUrl: './screen-saver-page.html',
  styleUrl: './screen-saver-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenSaverPage {
  private readonly router = inject(Router);
  private readonly hostElement = inject(ElementRef<HTMLElement>);

  protected readonly slides = signal<CarouselItem[]>([
    {
      src: 'assets/screen-saver/img1.jpg',
      alt: 'Estudiantes durante una clase de la academia',
      category: 'Clases',
    },
    {
      src: 'assets/screen-saver/img2.jpg',
      alt: 'Participantes en una presentacion academica',
      category: 'Presentaciones',
    },
    {
      src: 'assets/screen-saver/img3.jpg',
      alt: 'Imagen institucional de la academia',
      category: 'Institucional',
    },
    {
      src: 'assets/screen-saver/img4.jpg',
      alt: 'Actividad grupal en una clase',
      category: 'Formacion',
    },
    {
      src: 'assets/screen-saver/img5.jpg',
      alt: 'Momento destacado de una presentacion',
      category: 'Escenario',
    },
    {
      src: 'assets/screen-saver/img6.jpg',
      alt: 'Fotografia institucional con estudiantes',
      category: 'Comunidad',
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
    void this.router.navigateByUrl('/menu');
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
