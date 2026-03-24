import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { DanceTagListComponent } from '../../components/dance-tag-list/dance-tag-list.component';
import { GroupSidebarComponent } from '../../components/group-sidebar/group-sidebar.component';
import { MediaGridComponent } from '../../components/media-grid/media-grid.component';
import { ScheduleCardComponent } from '../../components/schedule-card/schedule-card.component';
import { ScreenContainerComponent } from '../../components/screen-container/screen-container.component';
import { TabNavigationComponent } from '../../components/tab-navigation/tab-navigation.component';
import { TeacherCardComponent } from '../../components/teacher-card/teacher-card.component';
import { DetailTab } from '../../models/kiosk.models';
import { AcademyContentService } from '../../services/academy-content.service';

@Component({
  selector: 'app-group-detail-page',
  standalone: true,
  imports: [
    BackButtonComponent,
    DanceTagListComponent,
    GroupSidebarComponent,
    MediaGridComponent,
    ScheduleCardComponent,
    ScreenContainerComponent,
    TabNavigationComponent,
    TeacherCardComponent,
  ],
  templateUrl: './group-detail-page.component.html',
  styleUrl: './group-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly content = inject(AcademyContentService);

  private readonly groupId = this.route.snapshot.paramMap.get('groupId') ?? '';
  private readonly levelId = this.route.snapshot.paramMap.get('levelId') ?? '';

  protected readonly group = computed(() => this.content.getGroup(this.groupId) ?? null);
  protected readonly level = computed(
    () => this.group()?.levels.find((level) => level.id === this.levelId) ?? null,
  );
  protected readonly activeTab = signal<DetailTab>(
    (this.route.snapshot.queryParamMap.get('tab') as DetailTab | null) ?? 'info',
  );
  protected readonly tabs = [
    { id: 'info' as const, label: 'Resumen' },
    { id: 'teachers' as const, label: 'Docencia' },
    { id: 'schedule' as const, label: 'Horarios' },
    { id: 'gallery' as const, label: 'Galería' },
  ];
  protected readonly disableTabAnimations = signal(false);

  constructor() {
    this.content.ensureBranchSelected();
  }

  protected goBack(): void {
    const group = this.group();
    if (!group) {
      void this.router.navigateByUrl('/menu');
      return;
    }

    void this.navigateAway(['/grupos', group.id, 'niveles']);
  }

  protected setTab(tab: DetailTab): void {
    if (this.activeTab() === tab) {
      return;
    }

    this.activeTab.set(tab);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  protected openEvent(eventId: string): void {
    const group = this.group();
    const level = this.level();
    if (!group || !level) {
      return;
    }

    void this.navigateAway([
      '/grupos',
      group.id,
      'niveles',
      level.id,
      'eventos',
      eventId,
    ]);
  }

  private async navigateAway(commands: readonly string[]): Promise<void> {
    this.disableTabAnimations.set(true);

    const navigated = await this.router.navigate(commands);

    if (!navigated) {
      this.disableTabAnimations.set(false);
    }
  }
}
