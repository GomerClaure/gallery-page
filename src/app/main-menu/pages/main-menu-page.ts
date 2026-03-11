import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { MenuTileComponent } from '../../shared/components/menu-tile/menu-tile.component';
import { IdleReturnHomeDirective } from '../../shared/directives/idle-return-home.directive';

@Component({
  selector: 'app-main-menu-page',
  standalone: true,
  imports: [BreadcrumbComponent, MenuTileComponent, IdleReturnHomeDirective],
  templateUrl: './main-menu-page.html',
  styleUrl: './main-menu-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMenuPage {
  private readonly router = inject(Router);

  protected readonly branches = [
    'Bafott Centro',
    'Bafott Norte',
    'Bafott Sur',
  ];

  protected readonly selectedBranch = signal(this.branches[0]);

  protected readonly menuItems = [
    {
      title: 'Clases y Grupos',
      description: 'Consulta actividades, horarios y espacios de formacion.',
      route: '/menu/clases',
      image: 'assets/menu/clases.jpeg',
      badge: 'Horarios',
    },
    {
      title: 'Talleres',
      description: 'Cursos intensivos y laboratorios creativos de temporada.',
      route: '/menu/clases',
      image: 'assets/menu/taller.jpeg',
      badge: 'Especiales',
    },
    {
      title: 'Presentaciones',
      description: 'Explora muestras, ensayos y eventos destacados de la academia.',
      route: '/menu/clases',
      image: 'assets/menu/presentaciones.jpg',
      badge: 'Escenario',
    },
    {
      title: 'Academia',
      description: 'Conoce la institucion, sus ambientes y la experiencia de formacion.',
      route: '/menu/clases',
      image: 'assets/menu/academia.jpeg',
      badge: 'Institucional',
    },
  ];

  protected navigate(route: string): void {
    void this.router.navigateByUrl(route);
  }

  protected updateBranch(branch: string): void {
    this.selectedBranch.set(branch);
  }
}
