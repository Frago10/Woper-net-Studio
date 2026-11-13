/*
  Prepara los archivos de originales/ para publicarlos en public/media/.

    npm run media:originales

  Qué hace:
  - Difumina las placas legibles (y el número de casa) de cada foto.
  - Recorta la foto del lavado de espuma para el hero (horizontal y vertical).
  - Recorta el logo: la llanta sola para la cabecera y el logo sin el lema para el footer.
  - Genera el ícono de la pestaña a partir de la llanta.

  Los originales no se tocan. Si llega una foto nueva, se agrega a la lista
  PHOTOS con las zonas a difuminar (en píxeles del original) y se vuelve a correr.
*/
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const src = (file) => path.join(root, 'originales', file);
const out = (file) => path.join(root, 'public/media', file);
const pub = (file) => path.join(root, 'public', file);

/** Devuelve la foto con las zonas indicadas difuminadas. */
async function withBlur(file, regions) {
  const overlays = await Promise.all(
    regions.map(async (region) => ({
      input: await sharp(src(file)).extract(region).blur(14).toBuffer(),
      left: region.left,
      top: region.top,
    })),
  );
  return sharp(src(file)).composite(overlays).jpeg({ quality: 92 }).toBuffer();
}

const PHOTOS = [
  {
    file: 'sedan-lavado-espuma.jpeg',
    blur: [{ left: 155, top: 990, width: 130, height: 130 }], // placa
    to: 'trabajos/01-lavado-espuma.jpg',
  },
  {
    file: 'suv-despues-del-lavado.jpeg',
    blur: [
      { left: 1048, top: 918, width: 80, height: 114 }, // placa
      { left: 640, top: 490, width: 46, height: 42 }, // número de casa
    ],
    to: 'trabajos/02-despues-del-lavado.jpg',
  },
  {
    file: 'pickup-secado.jpeg',
    blur: [],
    to: 'trabajos/03-secado-a-mano.jpg',
  },
];

for (const dir of ['logo', 'hero', 'trabajos']) await fs.mkdir(out(dir), { recursive: true });

for (const photo of PHOTOS) {
  await fs.writeFile(out(photo.to), await withBlur(photo.file, photo.blur));
}

// Hero: recortes de la foto de espuma (original de 1200x1600).
const foam = await withBlur(PHOTOS[0].file, PHOTOS[0].blur);
await sharp(foam)
  .extract({ left: 0, top: 520, width: 1200, height: 675 }) // 16:9, para escritorio
  .jpeg({ quality: 92 })
  .toFile(out('hero/hero-espuma-poster.jpg'));
await sharp(foam)
  .extract({ left: 250, top: 480, width: 630, height: 1120 }) // 9:16, para móvil
  .jpeg({ quality: 92 })
  .toFile(out('hero/hero-espuma-poster-movil.jpg'));

// Logo (original de 500x500 con fondo transparente).
await sharp(src('logo.png'))
  .extract({ left: 41, top: 12, width: 429, height: 250 }) // la llanta, sin el nombre
  .png()
  .toFile(out('logo/woper-net-emblema.png'));
await sharp(src('logo.png'))
  .extract({ left: 41, top: 12, width: 429, height: 399 }) // llanta, nombre y "Studio", sin el lema
  .png()
  .toFile(out('logo/woper-net-logo.png'));

// Ícono de la pestaña: el centro de la llanta sobre asfalto.
const hub = await sharp(src('logo.png'))
  .extract({ left: 96, top: 14, width: 256, height: 256 })
  .resize(432, 432)
  .toBuffer();

/** Ícono cuadrado de `size` px. `radius` redondea las esquinas (sobre 512). */
async function icon(size, radius) {
  const mask = Buffer.from(
    `<svg width="512" height="512"><rect width="512" height="512" rx="${radius}"/></svg>`,
  );
  const full = await sharp({
    create: { width: 512, height: 512, channels: 4, background: '#0e1012' },
  })
    .composite([
      { input: hub, left: 40, top: 40 },
      { input: mask, blend: 'dest-in' },
    ])
    .png()
    .toBuffer();
  return sharp(full).resize(size, size).png().toBuffer();
}

await fs.writeFile(pub('apple-touch-icon.png'), await icon(180, 0));
await fs.writeFile(pub('icon-192.png'), await icon(192, 96));
const png32 = await icon(32, 96);
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 32;
header[7] = 32;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png32.length, 14);
header.writeUInt32LE(22, 18);
await fs.writeFile(pub('favicon.ico'), Buffer.concat([header, png32]));

console.log(`[originales] ${PHOTOS.length} fotos, hero, logo e íconos listos en public/.`);
