/*
  Auditoría de accesibilidad con axe-core (WCAG 2.1 A y AA) en móvil y escritorio.
  Falla si hay problemas críticos o serios.

    npm run build && npm run preview     (en otra terminal)
    npm run test:a11y                    (usa http://localhost:4321)
    npm run test:a11y -- https://tu-dominio.com

  Requiere Playwright:  npm i -D playwright && npx playwright install chromium
*/
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const url = process.argv[2] ?? 'http://localhost:4321';

let chromium;
let AxeBuilder;
try {
  ({ chromium } = require('playwright'));
  ({ AxeBuilder } = require('@axe-core/playwright'));
} catch {
  console.error(
    'Falta Playwright. Instalalo con:\n  npm i -D playwright && npx playwright install chromium',
  );
  process.exit(2);
}

const viewports = [
  { name: 'móvil 390', width: 390, height: 844 },
  { name: 'escritorio 1440', width: 1440, height: 900 },
];

const browser = await chromium.launch();
let blocking = 0;

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });

  const states = [
    { name: 'página', prepare: async () => {} },
    {
      name: 'formulario con errores',
      prepare: async () => {
        await page.locator('[data-agenda] button[type="submit"]').click();
      },
    },
  ];
  if (viewport.width < 768) {
    states.push({
      name: 'menú abierto',
      prepare: async () => {
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.locator('[data-menu-abrir]').click();
      },
    });
  }

  for (const state of states) {
    await state.prepare();
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
      .analyze();

    console.log(`\n${viewport.name}, ${state.name}: ${violations.length} problema(s)`);
    for (const v of violations) {
      if (v.impact === 'critical' || v.impact === 'serious') blocking += 1;
      console.log(`  [${v.impact}] ${v.id}: ${v.help}`);
      for (const node of v.nodes.slice(0, 5)) console.log(`      ${node.target.join(' ')}`);
    }
  }
  await context.close();
}

await browser.close();

if (blocking) {
  console.error(`\n${blocking} problema(s) crítico(s) o serio(s).`);
  process.exit(1);
}
console.log('\nSin problemas críticos ni serios.');
