# Northstar login demo

A small, static login page. Open `index.html` directly in a browser; no server or external assets are required. This is a visual demo, not an authentication system: sign-in is disabled, and you should not enter real credentials.

## Tests

With Node.js and npm installed, run:

```sh
npm ci
npx playwright install chromium
npm test
```

The browser tests open the page from disk and check its layout, keyboard access, and demo behavior. Playwright may require additional system libraries; see the [Playwright installation guide](https://playwright.dev/docs/intro) if needed.
