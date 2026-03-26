import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BranchSelectorModalComponent } from '../../components/branch-selector-modal/branch-selector-modal.component';
import { ScreenContainerComponent } from '../../layout/screen-container/screen-container.component';
import { AcademyContentService } from '../../services/academy-content.service';
import { BackButtonComponent } from '../components/back-button/back-button.component';
import { ContactModalComponent } from '../components/contact-modal/contact-modal.component';
import { SeoService } from '../../../../core/services/seo.service';
import { ROUTE_SEO_CONFIG } from '../../../../core/config/route-seo.config';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [
    CommonModule,
    BackButtonComponent,
    BranchSelectorModalComponent,
    ContactModalComponent,
    ScreenContainerComponent,
  ],
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPageComponent {
  private readonly router = inject(Router);
  private readonly seoService = inject(SeoService);
  protected readonly content = inject(AcademyContentService);
  protected readonly showBranchSelector = signal(false);
  protected readonly showContactModal = signal(false);

  constructor() {
    const seoConfig = ROUTE_SEO_CONFIG.menu;
    this.seoService.updateSeo({
      title: seoConfig.title,
      description: seoConfig.description,
      keywords: seoConfig.keywords,
    });
  }

  protected openLevels(groupId: string): void {
    void this.router.navigate(['/grupos', groupId, 'niveles']);
  }

  protected goBack(): void {
    void this.router.navigateByUrl('/');
  }

  protected openBranchSelector(): void {
    this.showBranchSelector.set(true);
  }

  protected closeBranchSelector(): void {
    this.showBranchSelector.set(false);
  }

  protected openContactModal(): void {
    this.showContactModal.set(true);
  }

  protected closeContactModal(): void {
    this.showContactModal.set(false);
  }

  protected onBranchSelected(): void {
    this.showBranchSelector.set(false);
  }

  protected getStaggerClass(index: number): string {
    return `stagger-step-${(index % 6) + 1}`;
  }
}
