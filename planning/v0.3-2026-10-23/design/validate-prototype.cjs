/* Optional local scenario validation. This tests the static prototype, not iPhone functionality.
   Usage: node validate-prototype.cjs /absolute/path/to/chromium /absolute/output/dir
   Requires Playwright available in the executing environment. No install is performed. */
const { chromium } = require('playwright');
const { resolve, join } = require('node:path');
const { pathToFileURL } = require('node:url');
const { mkdir, writeFile } = require('node:fs/promises');
const assert = require('node:assert/strict');

(async () => {
  const executablePath = process.argv[2] || process.env.ATLAS_BROWSER_EXECUTABLE;
  const output = resolve(process.argv[3] || join(__dirname, 'validation'));
  await mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}), args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const errors = [];
  const externalRequests = [];
  const checks = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (/^https?:/.test(request.url())) externalRequests.push(request.url()); });
  const url = pathToFileURL(join(__dirname, 'PROTOTYPE.html')).href;
  const check = (name, result) => { assert.ok(result, name); checks.push({ name, status: 'passed' }); };
  try {
    await page.goto(url);
    const routes = await page.evaluate(() => window.atlasPrototype.routes);
    check('Sixteen routes exposed', routes.length === 16);
    for (const route of routes) {
      await page.evaluate(id => window.atlasPrototype.navigate(id), route);
      check(`${route}: one primary heading`, await page.locator('#content h1').count() === 1);
      check(`${route}: visible route body`, (await page.locator('#content').innerText()).length > 200);
    }
    await page.evaluate(() => window.atlasPrototype.navigate('apps'));
    await page.locator('[data-app="maps"]').click();
    check('Unknown application sizes stay unavailable', (await page.locator('.detail-body').innerText()).includes('Unavailable'));
    await page.locator('#search').fill('VLC');
    check('Scoped app search narrows rows', await page.locator('button[data-app]').count() === 1);
    await page.locator('#search').fill('');
    await page.locator('[data-app="telegram"]').click();
    await page.locator('[data-app-tab="Documents"]').click();
    check('Unexposed app documents explain boundary', (await page.locator('.detail-body').innerText()).includes('private container'));
    await page.locator('#content [data-source="live"]').first().click();
    check('Source inspector opens', await page.locator('[role="dialog"]').count() === 1);
    await page.keyboard.press('Escape');
    check('Source inspector closes with Escape', await page.locator('[role="dialog"]').count() === 0);
    await page.evaluate(() => window.atlasPrototype.navigate('documents'));
    await page.locator('[data-export="documents"]').click();
    check('Selected files become a review plan', await page.locator('[data-action="confirm-export"]').count() === 1);
    await page.locator('[data-action="confirm-export"]').click();
    check('Simulation requires its own confirmation', await page.locator('[data-action="simulate"]').count() === 1);
    await page.locator('[data-action="simulate"]').click();
    check('Receipt explicitly says simulated', (await page.locator('#content').innerText()).includes('No actual files were written'));
    check('No implemented result claimed', await page.evaluate(() => window.atlasPrototype.getState().planState) === 'simulated');
    await page.evaluate(() => window.atlasPrototype.navigate('settings'));
    await page.locator('[data-setting="connection"]').selectOption('disconnected');
    await page.evaluate(() => window.atlasPrototype.navigate('documents'));
    check('Disconnected source cannot start device export', await page.locator('[data-export="documents"]').isDisabled());
    await page.evaluate(() => window.atlasPrototype.navigate('backups'));
    check('Offline backups remain visible', (await page.locator('#content h1').innerText()).includes('without a connected phone'));
    await page.locator('#themeButton').click();
    check('Dark theme applies', await page.locator('html').getAttribute('data-theme') === 'dark');
    await page.screenshot({ path: join(output, 'backups-dark.png') });
    await page.goto(url + '?mode=advanced#apps');
    await page.screenshot({ path: join(output, 'apps-light.png') });
    await page.goto(url + '?mode=advanced#explorer');
    await page.screenshot({ path: join(output, 'explorer-light.png') });
    await page.setViewportSize({ width: 760, height: 900 });
    await page.goto(url + '#overview');
    check('Responsive shell avoids document horizontal overflow', await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
    await page.screenshot({ path: join(output, 'overview-narrow.png') });
    check('No JavaScript exceptions', errors.length === 0);
    check('No external network requests', externalRequests.length === 0);
    await writeFile(join(output, 'prototype-validation.json'), JSON.stringify({ status: 'passed', checks, errors, externalRequests, scope: 'static design prototype only' }, null, 2));
    process.stdout.write(JSON.stringify({ status: 'passed', checks: checks.length, output }) + '\n');
  } finally {
    await browser.close();
  }
})().catch(error => { process.stderr.write(error.stack + '\n'); process.exitCode = 1; });
