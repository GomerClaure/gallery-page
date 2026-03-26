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
import { SeoService } from '../../../core/services/seo.service';

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
  private readonly seoService = inject(SeoService);
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

    // Actualizar SEO en un solo lugar, de forma centralizada
    this.seoService.updateSeo({
      title: 'Academia de Danza Bafott | Grupos, niveles y presentaciones culturales',
      description: 'Descubre nuestros grupos de danza, niveles, horarios y galerías de presentaciones. Formación artística para niños, jóvenes y adultos.',
      keywords: 'academia, danza, grupos, niveles, presentaciones, formación',
      ogTitle: 'Academia de Danza | Grupos, niveles y presentaciones culturales',
      ogDescription: 'Explora nuestros grupos, niveles y eventos. Encuentra el grupo ideal y forma parte de nuestras presentaciones culturales.',
      ogImage: 'https://scontent.fcbb2-2.fna.fbcdn.net/v/t39.30808-6/528801148_1289150452612492_6064899708113268942_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=2a1932&_nc_ohc=XGgtjxvH7-EQ7kNvwG5O_gJ&_nc_oc=AdoavYEAE8jxuNI_Px38w2MUNcye0P65Pdbvhtd4rEHoJHq5QL4rZQMOpLo8j0ku9Cfmm0zt6U4vgOXrrcEpONiU&_nc_zt=23&_nc_ht=scontent.fcbb2-2.fna&_nc_gid=s-DJcAnhJ9UVGe8DVEdenA&_nc_ss=7a30f&oh=00_Afwde_SFa-GpPim3XGnDoMJtWAtDC36VJ2t2EkC03ghhLg&oe=69CB22E2',
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
