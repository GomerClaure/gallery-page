# Project Structure

## Current Structure
```text
src/app/
  app.component.ts
  app.component.html
  app.component.css
  app.config.ts
  app.routes.ts

  core/
    guards/

  shared/
    directives/
    ui/

  features/
    screen-saver/
      pages/

    kiosk/
      components/
      data/
      models/
      services/
      integrations/
      layout/
      menu/
      group-levels/
      group-detail/
      event-detail/
```

## Folder Responsibilities

### `src/app`
- App shell and root routing only
- No feature-specific business logic here

### `src/app/core`
- App-wide concerns
- Global guards and future truly cross-app infrastructure

### `src/app/shared`
- Reusable primitives
- Shared directives
- Shared UI building blocks that are used across features

### `src/app/features/screen-saver`
- Entry flow of the SPA
- Screen-saver page and any screen-saver-specific implementation

### `src/app/features/kiosk`
- Main kiosk experience
- Owns its data, models, services, layout, and screens

## Kiosk Feature Layout

### `components`
- Feature-shared kiosk components used by more than one kiosk flow
- Example: branch selector modal

### `data`
- Static or local feature data sources

### `models`
- Feature domain models and types

### `services`
- Feature services used by active runtime code

### `integrations/worker`
- Future worker integration code
- Not part of the main page flow unless explicitly activated

### `layout`
- Feature-owned layout containers

### `menu`
- Menu page and components owned by that flow

### `group-levels`
- Group levels page and level browsing components

### `group-detail`
- Group detail page and related UI blocks

### `event-detail`
- Event detail page and media-focused components

## Rules for Adding New Code
- Add new screens under the feature they belong to
- Add new feature-specific components next to the page or subflow that uses them
- Move code to `shared` only after it is clearly reused across features
- Do not recreate removed legacy folders such as `kiosk-demo`, `welcome`, or `group-selection`
- Keep naming in English for technical folders, files, and exported symbols
