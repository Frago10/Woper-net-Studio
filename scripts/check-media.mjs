/*
  Lista los archivos de medios que la página espera y todavía no existen.

    npm run check:media              informa y termina sin error
    npm run check:media -- --strict  falla si falta algo
    NODE_ENV=production              igual que --strict

  La lista sale de src/data/site.ts: si cambiás la galería, esto se actualiza solo.
*/
import { existsSync } from 'node:fs';
import path from 'node:path';
import { site } from '../src/data/site.ts';

const mediaDir = path.join(process.cwd(), 'public/media');
const strict =
  process.argv.includes('--strict') ||
  process.env.NODE_ENV === 'production' ||
  process.env.VERCEL_ENV === 'production';

const exists = (file) => existsSync(path.join(mediaDir, file));
const anyOf = (files) => files.some(exists);

/** Cada requisito se cumple si existe al menos uno de sus archivos. */
const required = [
  {
    label: 'Emblema del logo (la llanta)',
    files: ['logo/woper-net-emblema.svg', 'logo/woper-net-emblema.png'],
    spec: 'SVG, o PNG con fondo transparente de 1024 px',
  },
  {
    label: 'Póster del hero',
    files: [site.hero.poster],
    spec: '2400x1350, fotografía oscura, espuma sobre carro',
  },
  ...site.hero.videos.map((file) => ({
    label: 'Video del hero',
    files: [file],
    spec: '1080p, 8 a 12 s, sin audio, máx. 4 MB',
  })),
  ...site.gallery.map((item) => ({
    label: `Trabajos: ${item.caption}`,
    files: [item.file],
    spec:
      item.kind === 'reel' ? 'mp4 vertical 1080x1920' : '1600 px en el lado largo, jpg o webp',
  })),
];

const recommended = [
  {
    label: 'Wordmark del logo',
    files: ['logo/woper-net-wordmark.svg', 'logo/woper-net-wordmark.png'],
    spec: 'SVG o PNG transparente. Sin él, el nombre se escribe con la tipografía del sitio',
  },
  ...site.gallery
    .filter((item) => item.kind === 'reel' && item.poster)
    .map((item) => ({
      label: `Portada del reel: ${item.caption}`,
      files: [item.poster],
      spec: 'jpg vertical 1080x1920',
    })),
];

const missing = required.filter((r) => !anyOf(r.files));
const missingRecommended = recommended.filter((r) => !anyOf(r.files));

const print = (title, list) => {
  if (!list.length) return;
  console.log(`\n${title}`);
  for (const item of list) {
    console.log(`  - public/media/${item.files.join('  o  ')}`);
    console.log(`      ${item.label}. ${item.spec}.`);
  }
};

console.log(
  `Medios: ${required.length - missing.length} de ${required.length} archivos obligatorios presentes.`,
);
print('Faltan (obligatorios):', missing);
print('Faltan (recomendados):', missingRecommended);

if (!missing.length) {
  console.log('\nTodos los medios obligatorios están en su lugar.');
} else if (strict) {
  console.error('\nNo se puede publicar: faltan medios obligatorios.');
  process.exit(1);
} else {
  console.log('\nLa página usa paneles vacíos en su lugar. Con --strict este comando falla.');
}
