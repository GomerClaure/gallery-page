# ProyectoPrueba

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Database (Cloudflare D1)

This project uses a Cloudflare D1 database named `academy-info-bafott`. Make sure you have the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) installed.

### 1. Login and list databases

```bash
npx wrangler login
npx wrangler d1 list
```

### 2. Run migrations (remote)

Comando directo que usas:

```bash
npx wrangler d1 execute academy-info-bafott --remote --file=./db/migrations/0001_initial.sql
```

Atajo con npm (opcional):

```bash
npm run db:migrate
```

### 3. Run seeds (local)

Comando directo que usas:

```bash
npx wrangler d1 execute academy-info-bafott --local --file=./db/seeds/001_initial_content.sql
```

Atajo con npm (opcional):

```bash
npm run db:seed
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
