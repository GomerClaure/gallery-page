/**
 * SEO Configuration for routes
 *
 * Centraliza los metadatos de SEO para todas las rutas
 * Usado por los page components para actualizar meta tags al cargar
 */

export const ROUTE_SEO_CONFIG = {
  home: {
    title: 'Academia de Danza Bafott | Bienvenido',
    description: 'Plataforma interactiva de servicio al cliente para academias de dirección de escena y danza',
    keywords: 'academia, danza, bienvenida, inicio',
  },
  menu: {
    title: 'Academia de Danza | Menú Principal',
    description: 'Explora nuestros grupos, niveles y eventos en tu academia de danza favorita',
    keywords: 'grupos, niveles, eventos, menú',
  },
  groupLevels: {
    title: 'Niveles de Grupo | Academia de Danza',
    description: 'Descubre los diferentes niveles disponibles en nuestros grupos de danza',
    keywords: 'niveles, grupos, danza, formación',
  },
  groupDetail: {
    title: 'Detalles del Grupo | Academia de Danza',
    description: 'Información completa del grupo: horarios, maestros, nivel y próximas presentaciones',
    keywords: 'grupo, maestro, horario, nivel, presentación',
  },
  eventDetail: {
    title: 'Evento | Academia de Danza',
    description: 'Detalles del evento: galería de fotos, videos y presentaciones de nuestros grupos',
    keywords: 'evento, galería, video, presentación, fotos',
  },
};

export type RouteSeoKey = keyof typeof ROUTE_SEO_CONFIG;
