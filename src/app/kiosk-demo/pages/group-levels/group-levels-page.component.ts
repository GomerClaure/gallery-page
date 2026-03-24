import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LevelsSlicer } from '../../components/levels-slider/levels-slider.component';
import { ScreenContainerComponent } from '../../components/screen-container/screen-container.component';
import { AcademyContentService } from '../../services/academy-content.service';
import { BackButtonComponent } from '../../components/back-button/back-button.component';

@Component({
  selector: 'app-group-levels-page',
  standalone: true,
  imports: [BackButtonComponent ,LevelsSlicer, ScreenContainerComponent],
  templateUrl: './group-levels-page.component.html',
  styleUrls: ['./group-levels-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupLevelsPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly content = inject(AcademyContentService);

  protected readonly group =
    this.content.getGroup(this.route.snapshot.paramMap.get('groupId') ?? '') ??
    this.content.groups()[0];

  constructor() {
    this.content.ensureBranchSelected();
  }

  protected goBack(): void {
    void this.router.navigateByUrl('/menu');
  }

  protected openLevel(levelId: string): void {
    void this.router.navigate(['/grupos', this.group.id, 'niveles', levelId]);
  }
}
