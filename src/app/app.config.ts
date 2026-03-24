import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  provideRouter,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';

function getPrimaryRouteFingerprint(snapshot: ActivatedRouteSnapshot): string {
  const routeConfigParts: string[] = [];
  const routeParamParts: string[] = [];
  let current: ActivatedRouteSnapshot | null = snapshot;

  while (current) {
    if (current.outlet === 'primary') {
      const routePath = current.routeConfig?.path;

      if (routePath) {
        routeConfigParts.push(routePath);
      }

      for (const [key, value] of Object.entries(current.params).sort(([a], [b]) =>
        a.localeCompare(b),
      )) {
        routeParamParts.push(`${key}:${value}`);
      }
    }

    current = current.children.find((child) => child.outlet === 'primary') ?? null;
  }

  return `${routeConfigParts.join('/')}//${routeParamParts.join('|')}`;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withViewTransitions({
        onViewTransitionCreated({ transition, from, to }) {
          // Ignore query-param-only navigations, like switching tabs in group detail.
          if (getPrimaryRouteFingerprint(from) === getPrimaryRouteFingerprint(to)) {
            transition.skipTransition();
          }
        },
      }),
    ),
  ]
};
