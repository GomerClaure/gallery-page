import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademyContentService } from '../../services/academy-content.service';

@Component({
  selector: 'app-branch-selector-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './branch-selector-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchSelectorModalComponent {
  private readonly contentService = inject(AcademyContentService);

  protected readonly branches = this.contentService.branches;
  protected readonly selectedBranchId = signal<string | null>(null);

  readonly onClose = output<void>();
  readonly onBranchSelected = output<void>();

  protected selectBranch(branchId: string): void {
    this.selectedBranchId.set(branchId);
  }

  protected confirmSelection(): void {
    const branchId = this.selectedBranchId();
    if (branchId) {
      this.contentService.selectBranch(branchId);
      this.onBranchSelected.emit();
    }
  }

  protected closeModal(): void {
    this.onClose.emit();
  }
}

