import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
  ImageSlide,
  ImageSwiperComponent,
} from '../../shared/components/image-swiper/image-swiper.component';
import { BranchSelectorModalComponent } from '../../kiosk-demo/components/branch-selector-modal/branch-selector-modal.component';
import { AcademyContentService } from '../../kiosk-demo/services/academy-content.service';

@Component({
  selector: 'app-screen-saver-page',
  standalone: true,
  imports: [CommonModule, ImageSwiperComponent, BranchSelectorModalComponent],
  templateUrl: './screen-saver-page.html',
  styleUrl: './screen-saver-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenSaverPage {
  private readonly router = inject(Router);
  private readonly hostElement = inject(ElementRef<HTMLElement>);
  private readonly contentService = inject(AcademyContentService);

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

  protected readonly showBranchSelector = signal(false);

  constructor() {
    afterNextRender(() => {
      const screenSaverElement = this.hostElement.nativeElement.querySelector(
        '.screen-saver',
      ) as HTMLElement | null;

      screenSaverElement?.focus();
    });
  }

  protected openMenu(): void {
    if (this.contentService.isBranchSelected()) {
      void this.router.navigateByUrl('/menu');
    } else {
      this.showBranchSelector.set(true);
    }
  }

  protected closeBranchSelector(): void {
    this.showBranchSelector.set(false);
  }

  protected onBranchSelected(): void {
    this.showBranchSelector.set(false);
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
