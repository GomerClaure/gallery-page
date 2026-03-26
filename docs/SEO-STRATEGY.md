# Mejorando SEO en tu Arquitectura Angular

## 🎯 Filosofía de Diseño

Tu arquitectura es **SPA-first** y **feature-based**. Esto requiere un enfoque especial para SEO:

1. **Servicio centralizado** (`core/services/seo.service.ts`) — Gestión uniforme de meta tags
2. **Metadatos por ruta** (`core/config/route-seo.config.ts`) — Configuración centralizada
3. **Actualización en páginas** — Cada page component actualiza SEO al cargar

## 📍 Estructura Correcta

```
src/app/
├── core/
│   ├── services/
│   │   └── seo.service.ts          ✅ Servicio global
│   └── config/
│       └── route-seo.config.ts     ✅ Metadatos centralizados
├── features/
│   └── **/page/
│       └── *-page.component.ts     ✅ Inyecta y usa SeoService
└── index.html                       ✅ Meta tags base mejorados
```

## 📝 Cómo Usar en Page Components

### Importar el servicio:
```typescript
import { SeoService } from '../../../core/services/seo.service';
```

### En el constructor, actualizar SEO:
```typescript
private readonly seoService = inject(SeoService);

constructor() {
  this.seoService.updateSeo({
    title: 'Tu título optimizado',
    description: 'Descripción con palabras clave...',
    keywords: 'palabra1, palabra2, palabra3',
    ogTitle: 'Título para redes sociales',
    ogDescription: 'Descripción para compartir',
    ogImage: 'URL de imagen para OpenGraph',
  });
}
```

### Para páginas con parámetros dinámicos (ej: grupo, evento):
```typescript
import { ActivatedRoute } from '@angular/router';

export class GroupDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly seoService = inject(SeoService);
  
  constructor() {
    this.route.params.subscribe(params => {
      const groupName = 'Tu grupo: ' + params['groupId']; // Valores reales desde datos
      
      this.seoService.updateSeo({
        title: `${groupName} | Academia de Danza`,
        description: 'Información actual del grupo...',
      });
    });
  }
}
```

## ✅ Checklist de Implementación

- [x] Servicio SeoService creado en `core/services`
- [x] index.html mejorado con meta tags esenciales
- [x] robots.txt en `public/` (indexación comentada temporalmente)
- [x] Configuración de rutas en `route-seo.config.ts`
- [x] Ejemplo: screen-saver-page refactorizado
- [x] Refactorizar menu-page.component.ts
- [x] Refactorizar group-levels-page.component.ts
- [x] Refactorizar group-detail-page.component.ts
- [x] Refactorizar event-detail-page.component.ts

## 🔍 SEO Implementado

### Nivel 1: Base (index.html)
- ✅ Meta charset, viewport
- ✅ Meta description y keywords
- ✅ Open Graph tags
- ✅ Canonical URL
- ✅ Language (es)
- ✅ Theme color
- ✅ Meta charset, viewport
- ✅ Meta description y keywords
- ✅ Open Graph tags base (og:type, og:title, og:description)
- ✅ Language (es)
**Nota:** Canonical URL mantenido en `src/index.html` comentado. Se actualiza dinámicamente via SeoService en cada página si es necesario.

### Nivel 2: Por página (SeoService)
- ✅ Título dinámico
- ✅ Descripción contextual
- ✅ Palabras clave
- ✅ Open Graph mejorado por página
- ✅ Canonical URLs por ruta

### Nivel 3: Robots y Indexación (robots.txt)
- ✅ Indica crawler path
- ⏳ Sitemap reference (comentada temporalmente)
- ⏳ Crawl-delay (comentado temporalmente)

> **NOTA:** Indexación en Google está desactivada temporalmente. Para activarla:
> 1. En `public/robots.txt`: Cambiar `Disallow: /` a `Allow: /`
> 2. En `src/index.html`: Cambiar meta robots de `noindex, nofollow` a `index, follow`
> 3. Descomentar canonical URL en index.html

## 🚀 Próximos Pasos (Futuro)

1. **Sitemap dinámico** — Generar `sitemap.xml` basado en rutas
2. **Structured Data (Schema.org)** — JSON-LD para rico snippets
3. **Performance** — Optimizar LCP, CLS, FID (Core Web Vitals)
4. **Analytics** — Google Analytics 4 para rastrear comportamiento

## 📚 Referencias

- [Angular Meta Service Docs](https://angular.io/guide/dom-sanitization)
- [MDN: Meta Tags](https://developer.mozilla.org/es/docs/Web/HTML/Element/meta)
- [SEO Audit Checklist](https://moz.com/beginners-guide-to-seo)
