import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { BranchSelectorModalComponent } from '../../components/branch-selector-modal/branch-selector-modal.component';
import { ScreenContainerComponent } from '../../components/screen-container/screen-container.component';
import { AcademyContentService } from '../../services/academy-content.service';

@Component({
  selector: 'app-menu-principal-page',
  standalone: true,
  imports: [
    CommonModule,
    BackButtonComponent,
    BranchSelectorModalComponent,
    ScreenContainerComponent,
  ],
  templateUrl: './menu-principal-page.component.html',
  styleUrls: ['./menu-principal-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPrincipalPage {
  private readonly router = inject(Router);
  protected readonly content = inject(AcademyContentService);
  protected readonly showBranchSelector = signal(false);

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

  protected onBranchSelected(): void {
    this.showBranchSelector.set(false);
  }

  protected getStaggerClass(index: number): string {
    const pattern = index % 6;

    if (pattern === 0) return 'stagger-step-1';
    if (pattern === 1) return 'stagger-step-2';
    if (pattern === 2) return 'stagger-step-3';
    if (pattern === 3) return 'stagger-step-4';
    if (pattern === 4) return 'stagger-step-5';
    return 'stagger-step-6';
  }
}
