import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { GroupCardComponent } from '../../components/group-card/group-card.component';
import { ScreenContainerComponent } from '../../components/screen-container/screen-container.component';
import { AcademyContentService } from '../../services/academy-content.service';

@Component({
  selector: 'app-group-selection-page',
  standalone: true,
  imports: [BackButtonComponent, GroupCardComponent, ScreenContainerComponent],
  templateUrl: './group-selection-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupSelectionPageComponent {
  private readonly router = inject(Router);
  protected readonly content = inject(AcademyContentService);

  constructor() {
    this.content.ensureBranchSelected();
  }

  protected openLevels(groupId: string): void {
    void this.router.navigate(['/kiosk/grupos', groupId, 'niveles']);
  }

  protected goBack(): void {
    void this.router.navigateByUrl('/kiosk');
  }
}
