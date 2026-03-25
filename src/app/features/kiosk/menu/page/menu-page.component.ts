import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BranchSelectorModalComponent } from '../../components/branch-selector-modal/branch-selector-modal.component';
import { ScreenContainerComponent } from '../../layout/screen-container/screen-container.component';
import { AcademyContentService } from '../../services/academy-content.service';
import { BackButtonComponent } from '../components/back-button/back-button.component';
import { ContactModalComponent } from '../components/contact-modal/contact-modal.component';

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
  protected readonly content = inject(AcademyContentService);
  protected readonly showBranchSelector = signal(false);
  protected readonly showContactModal = signal(false);

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
