import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

export interface SeoConfig {
  title: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

/**
 * Servicio centralizado para gestionar SEO
 * Ubicado en `core` porque es un concern global
 * Debe ser inyectado en cada page component al cargar
 */
@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  private readonly defaultConfig: SeoConfig = {
    title: 'BAFOTT - Academia de Danza',
    description: 'Plataforma interactiva de servicio al cliente para academias de dirección de escena y danza',
  };

  /**
   * Actualiza todos los meta tags según la configuración proporcionada
   */
  updateSeo(config: SeoConfig): void {
    const fullConfig = { ...this.defaultConfig, ...config };

    // Title
    this.titleService.setTitle(fullConfig.title);

    // Meta description
    if (fullConfig.description) {
      this.metaService.updateTag({
        name: 'description',
        content: fullConfig.description,
      });
    }

    // Keywords
    if (fullConfig.keywords) {
      this.metaService.updateTag({
        name: 'keywords',
        content: fullConfig.keywords,
      });
    }

    // Open Graph tags
    if (fullConfig.ogTitle) {
      this.metaService.updateTag({
        property: 'og:title',
        content: fullConfig.ogTitle,
      });
    }

    if (fullConfig.ogDescription) {
      this.metaService.updateTag({
        property: 'og:description',
        content: fullConfig.ogDescription,
      });
    }

    if (fullConfig.ogImage) {
      this.metaService.updateTag({
        property: 'og:image',
        content: fullConfig.ogImage,
      });
    }
  }

  /**
   * Restablece a configuración por defecto
   */
  resetToDefaults(): void {
    this.updateSeo(this.defaultConfig);
  }
}
