import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { BranchSelectorModalComponent } from '../../components/branch-selector-modal/branch-selector-modal.component';
import { HeroWelcomeComponent } from '../../components/hero-welcome/hero-welcome.component';
import { ScreenContainerComponent } from '../../components/screen-container/screen-container.component';
import { AcademyContentService } from '../../services/academy-content.service';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [
    BranchSelectorModalComponent,
    HeroWelcomeComponent,
    ScreenContainerComponent,
  ],
  templateUrl: './welcome-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomePageComponent {
  private readonly router = inject(Router);
  protected readonly content = inject(AcademyContentService);
  protected readonly branchModalOpen = signal(!this.content.selectedBranch());
  protected readonly shouldShowModal = computed(() => this.branchModalOpen());

  protected closeBranchSelector(): void {
    this.branchModalOpen.set(false);
  }

  protected onBranchSelected(): void {
    this.branchModalOpen.set(false);
    void this.router.navigateByUrl('/menu');
  }

  protected openGroups(): void {
    this.content.ensureBranchSelected();
    void this.router.navigateByUrl('/menu');
  }
}
