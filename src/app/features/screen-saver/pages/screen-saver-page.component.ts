import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  computed,
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
  ImageSwiperComponent,
} from '../../../shared/ui/image-swiper/image-swiper.component';
import { BranchSelectorModalComponent } from '../../kiosk/components/branch-selector-modal/branch-selector-modal.component';
import { AcademyContentService } from '../../kiosk/services/academy-content.service';

@Component({
  selector: 'app-screen-saver-page',
  standalone: true,
  imports: [CommonModule, ImageSwiperComponent, BranchSelectorModalComponent],
  templateUrl: './screen-saver-page.component.html',
  styleUrl: './screen-saver-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenSaverPageComponent {
  private readonly router = inject(Router);
  private readonly hostElement = inject(ElementRef<HTMLElement>);
  protected readonly contentService = inject(AcademyContentService);
  protected readonly slides = computed(() => this.contentService.getScreenSaverSlides());
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
