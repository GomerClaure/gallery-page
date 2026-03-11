import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { IdleReturnHomeDirective } from '../../../shared/directives/idle-return-home.directive';
import { danceClasses } from '../../data/classes.data';

@Component({
  selector: 'app-clases-page',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, IdleReturnHomeDirective],
  templateUrl: './clases-page.component.html',
  styleUrl: './clases-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClasesPageComponent {
  private readonly router = inject(Router);

  protected readonly filterOptions = [
    {
      id: 'Todos los dias',
      label: 'Todos',
      caption: 'Vista completa',
      matches: () => true,
    },
    {
      id: 'Lun-Mie-Vie',
      label: 'Lun-Mie-Vie',
      caption: 'Ritmo intensivo',
      matches: (days: string[]) => days.includes('Lun'),
    },
    {
      id: 'Mar-Jue',
      label: 'Mar-Jue',
      caption: 'Semana media',
      matches: (days: string[]) => days.includes('Mar'),
    },
    {
      id: 'Sabados',
      label: 'Sabados',
      caption: 'Fin de semana',
      matches: (days: string[]) => days.includes('Sab'),
    },
  ] as const;

  protected readonly daysFilter = signal<string>('Todos los dias');
  protected readonly classCarouselBreakpoints = {
    0: { slidesPerView: 1.06, spaceBetween: 16 },
    768: { slidesPerView: 1.12, spaceBetween: 18 },
    1024: { slidesPerView: 1.35, spaceBetween: 18 },
    1280: { slidesPerView: 1.65, spaceBetween: 22 },
  };

  protected readonly filteredClasses = computed(() => {
    const activeFilter = this.filterOptions.find(
      (filter) => filter.id === this.daysFilter(),
    );

    return danceClasses.filter((danceClass) =>
      activeFilter?.matches(danceClass.days) ?? true,
    );
  });

  protected readonly activeFilter = computed(
    () =>
      this.filterOptions.find((filter) => filter.id === this.daysFilter()) ??
      this.filterOptions[0],
  );

  protected readonly resultsLabel = computed(() => {
    const count = this.filteredClasses().length;
    return `${count} grupo${count === 1 ? '' : 's'} disponibles`;
  });

  protected setFilter(filter: string): void {
    this.daysFilter.set(filter);
  }

  protected exploreClass(classId: string): void {
    void this.router.navigate(['/menu/clases', classId]);
  }
}
