# Summary

Create a static login page

## What changed

- Added a responsive, labeled login mockup with a disabled sign-in button and demo notice.
- Added browser tests and a minimal npm test setup.

## Decisions

- The page is a visual demo, not an authentication system. It has no form submission, backend, or page scripts; visitors are warned not to enter real credentials.
- The page and its assets work from disk without a server or network connection.

## How each criterion is met

- Small static login page: `renders locally at desktop and mobile widths` checks the page, labels, notice and responsive widths; `loads without network dependencies` checks local assets.
- Accessible interaction and demo safety: `labels, keyboard navigation and focus indication work` checks labels and keyboard focus; `demo cannot submit or persist entered values` checks the disabled button, Enter key, network requests and reload behavior.

## How to verify

Open `index.html` directly in a browser. For automated checks, run `npm ci`, `npx playwright install chromium`, then `npm test`.

## Tests

- Added four Playwright browser tests in `tests/login.test.cjs`.
- `PLAYWRIGHT_BROWSERS_PATH=/opt/factory-browsers/playwright npm test`: passed, 4 tests.
- `git diff --check`: passed.
- No project lint or typecheck scripts are configured; the page has no application JavaScript or TypeScript.

## Docs updated

- `README.md`: opening the demo and running tests.

## Open questions

None.
