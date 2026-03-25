# Architecture

## Stack
- Angular 21 standalone application
- Signals for local reactive state
- Angular Router with `loadComponent`
- CSS-first animations with project styles and view transitions
- Tailwind CSS 4 for utility classes where useful
- Swiper for carousel interactions
- Vitest and Angular testing utilities for tests

## Architectural Style
- Single-page application with feature-based organization
- Thin app shell at `src/app`
- `core` for truly app-wide concerns
- `shared` only for reusable UI primitives and directives
- `features` for business flows and screen-specific implementation
- Keep domain data, models, services, layout, pages, and feature-local components close to the feature that owns them

## Organization Rules
- New runtime code must live under `src/app/features`, `src/app/core`, or `src/app/shared`
- `core` is for cross-app guards and other global concerns only
- `shared` is for reusable primitives used by more than one feature
- Do not add generic `utils`, `common`, or `components` folders at the app root unless they are clearly cross-feature
- Prefer folders by feature or flow, not by technical type alone
- Pages may import from:
  - their own feature
  - `shared`
  - `core` when needed
- Shared code must not depend on feature code
- Worker integration code stays under `features/kiosk/integrations/worker` until it becomes active runtime behavior

## SPA vs SSR Decision
- This project is SPA-first
- SSR is intentionally not part of the architecture
- Reasons:
  - the current experience is kiosk-like and navigation-driven
  - state is local and branch-selection driven
  - animations and transitions are optimized for client-side flow
  - there is no current SEO or server-rendering requirement
- Do not introduce SSR or hybrid rendering unless a new product requirement explicitly justifies it

## Data Strategy
- Use in-memory feature data and feature services as the current source of truth
- `AcademyContentService` is the runtime content facade for the kiosk flow
- Keep models near the feature that owns them
- Persist only the minimum local UI state needed for continuity, such as selected branch
- Future remote integration must be added behind the existing feature service boundary, not wired directly into pages
- Avoid premature state libraries unless the app grows beyond what Signals and feature services can handle cleanly

## Animation Rules
- Prefer CSS animations, transitions, and Angular view transitions
- Keep animations meaningful and tied to navigation or hierarchy
- Respect `prefers-reduced-motion`
- Avoid duplicate animation systems for the same behavior
- Reuse existing motion patterns before adding new ones
- Animation code should remain close to the component or page that owns it unless it is a global route transition

## Performance Rules
- Default to standalone lazy-loaded pages through `loadComponent`
- Keep feature boundaries clear to avoid accidental coupling and oversized imports
- Prefer Signals and computed state over unnecessary RxJS chains for local UI state
- Remove dead code, unused components, and unused styles promptly
- Avoid duplicate UI abstractions and extra wrapper layers
- Keep `shared` small so reusable code stays cheap to understand and load
- Do not introduce global state, SSR, or extra architecture layers without measured need
