import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { BranchSelectorModalComponent } from '../../components/branch-selector-modal/branch-selector-modal.component';
import { GroupCardComponent } from '../../components/group-card/group-card.component';
import { ScreenContainerComponent } from '../../components/screen-container/screen-container.component';
import { AcademyContentService } from '../../services/academy-content.service';

@Component({
  selector: 'app-group-selection-page',
  standalone: true,
  imports: [
    BackButtonComponent,
    BranchSelectorModalComponent,
    GroupCardComponent,
    ScreenContainerComponent,
  ],
  templateUrl: './group-selection-page.component.html',
  styleUrl: './group-selection-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupSelectionPageComponent {
  private readonly router = inject(Router);
  protected readonly content = inject(AcademyContentService);
  protected readonly showBranchSelector = signal(false);

  constructor() {
    this.content.ensureBranchSelected();
  }

  protected openLevels(groupId: string): void {
    void this.router.navigate(['/kiosk/grupos', groupId, 'niveles']);
  }

  protected goBack(): void {
    void this.router.navigateByUrl('/kiosk');
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
}
