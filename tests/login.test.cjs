const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const { resolve } = require('node:path');
const { chromium } = require('playwright');

const url = pathToFileURL(resolve(__dirname, '../index.html')).href;
let browser;
after(async () => { if (browser) await browser.close(); });

async function openPage(viewport) {
  browser ||= await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport });
  await page.goto(url);
  return page;
}

test('renders locally at desktop and mobile widths', async () => {
  for (const width of [1440, 320]) {
    const page = await openPage({ width, height: 800 });
    assert.equal(await page.title(), 'Sign in · Northstar');
    assert.equal(await page.getByRole('heading', { name: 'Welcome back.' }).count(), 1);
    assert.equal(await page.getByLabel('Email address').count(), 1);
    assert.equal(await page.getByLabel('Password').count(), 1);
    assert.equal(await page.getByText(/Demo only/).isVisible(), true);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    assert.equal(await page.getByLabel('Email address').isVisible(), true);
    await page.close();
  }
});

test('loads without network dependencies', async () => {
  browser ||= await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const requests = [];
  page.on('request', request => requests.push(request.url()));
  await page.goto(url);
  assert.ok(requests.includes(url));
  assert.ok(requests.some(request => request.endsWith('/styles.css')));
  assert.ok(requests.every(request => request.startsWith('file:')));
  assert.notEqual(await page.locator('.login-card').evaluate(el => getComputedStyle(el).borderRadius), '0px');
  await page.close();
});

test('labels, keyboard navigation and focus indication work', async () => {
  const page = await openPage({ width: 800, height: 800 });
  await page.keyboard.press('Tab');
  assert.equal(await page.locator(':focus').getAttribute('id'), 'email');
  assert.notEqual(await page.locator(':focus').evaluate(el => getComputedStyle(el).outlineStyle), 'none');
  await page.keyboard.press('Tab');
  assert.equal(await page.locator(':focus').getAttribute('id'), 'password');
  assert.equal(await page.getByLabel('Password').getAttribute('type'), 'password');
  await page.close();
});

test('demo cannot submit or persist entered values', async () => {
  const page = await openPage({ width: 800, height: 800 });
  const requests = [];
  page.on('request', request => requests.push(request.url()));
  await page.getByLabel('Email address').fill('demo@example.com');
  await page.getByLabel('Password').fill('not-a-real-password');
  assert.equal(await page.getByRole('button', { name: 'Sign in' }).isDisabled(), true);
  await page.getByLabel('Password').press('Enter');
  assert.equal(page.url(), url);
  assert.deepEqual(requests, []);
  assert.equal(await page.locator('form').count(), 0);
  await page.reload();
  assert.equal(await page.getByLabel('Email address').inputValue(), '');
  assert.equal(await page.getByLabel('Password').inputValue(), '');
  await page.close();
});
