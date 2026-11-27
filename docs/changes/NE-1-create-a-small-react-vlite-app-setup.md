## Summary

Set up a React and Vite starter app

## What changed

- Added a React/TypeScript page, Vite entry point, styles, and an interactive counter.
- Added npm scripts, a lockfile, TypeScript and ESLint configuration, and ignore rules for generated files.
- Added a component test and local setup instructions.

## Decisions

- Used TypeScript and Vite's React plugin for a small, typed starter. Vitest and Testing Library exercise the component; ESLint provides a lint check.
- The documented Node versions satisfy both the app and its test tooling.

## How each criterion is met

- Small React/Vite app setup: `renders the starter page and increments the counter` verifies the page and interaction. Browser smoke checks also verified the dev server, hot update, and production preview.
- Repeatable install and production build: `npm ci` and `npm run build` verified the lockfile, TypeScript checks, and Vite bundling.

## How to verify

Run `npm ci`, `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build`. Run `npm run dev` to view and edit the app, or `npm run preview` to view the build.

## Tests

- Added `src/App.test.tsx`: starter heading and counter interaction; `npm test` passed (1 test).
- `npm ci`, `npm run typecheck`, `npm run lint`, and `npm run build` passed on Node 26.13.1.
- Browser smoke checks passed for dev rendering, counter interaction, a live source edit, and production preview rendering and interaction.
- The first typecheck failed on the CSS import; adding Vite's client type reference fixed it. Subsequent typechecks and builds passed.

## Docs updated

- `README.md`: Node requirements and install, development, check, build, and preview commands.

## Open questions

None.
