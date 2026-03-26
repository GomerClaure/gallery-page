import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ScreenContainerComponent } from '../../layout/screen-container/screen-container.component';
import { AcademyContentService } from '../../services/academy-content.service';
import { BackButtonComponent } from '../../menu/components/back-button/back-button.component';
import { LevelsSliderComponent } from '../components/levels-slider/levels-slider.component';
import { SeoService } from '../../../../core/services/seo.service';
import { ROUTE_SEO_CONFIG } from '../../../../core/config/route-seo.config';

@Component({
  selector: 'app-group-levels-page',
  standalone: true,
  imports: [BackButtonComponent, LevelsSliderComponent, ScreenContainerComponent],
  templateUrl: './group-levels-page.component.html',
  styleUrls: ['./group-levels-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupLevelsPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly seoService = inject(SeoService);
  private readonly groupId = this.route.snapshot.paramMap.get('groupId') ?? '';

  protected readonly content = inject(AcademyContentService);
  protected readonly group = computed(() => this.content.getGroup(this.groupId) ?? null);

  constructor() {
    this.content.ensureBranchSelected();

    const seoConfig = ROUTE_SEO_CONFIG.groupLevels;
    this.seoService.updateSeo({
      title: seoConfig.title,
      description: seoConfig.description,
      keywords: seoConfig.keywords,
    });
  }

  protected goBack(): void {
    void this.router.navigateByUrl('/menu');
  }

  protected openLevel(levelId: string): void {
    const group = this.group();
    if (!group) {
      return;
    }

    void this.router.navigate(['/grupos', group.id, 'niveles', levelId]);
  }
}
