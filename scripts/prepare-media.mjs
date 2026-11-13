/*
  Convierte las imágenes de public/media/ a AVIF y WebP en varios anchos.

  Entrada:  public/media/**            (originales, se suben al repositorio)
  Salida:   public/_media/**           (generado, no se sube)
            src/data/media.generated.json (manifiesto con medidas y variantes)

  Corre solo antes de `npm run dev` y `npm run build`. Las imágenes que ya
  están al día no se vuelven a procesar.
*/
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const srcDir = path.join(root, 'public/media');
const outDir = path.join(root, 'public/_media');
const manifestFile = path.join(root, 'src/data/media.generated.json');

/** Anchos por carpeta. Nunca se amplía una imagen por encima de su original. */
const WIDTHS = {
  hero: [640, 960, 1280, 1920, 2400],
  trabajos: [320, 480, 720, 1080, 1600],
  logo: [64, 128, 256, 512],
};
const DEFAULT_WIDTHS = [480, 960, 1600];
const FALLBACK_WIDTH = { hero: 1280, trabajos: 720, logo: 128 };
const IMAGE = /\.(jpe?g|png|webp)$/i;

async function walk(dir) {
  if (!existsSync(dir)) return [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => {
      const full = path.join(dir, e.name);
      return e.isDirectory() ? walk(full) : [full];
    }),
  );
  return files.flat();
}

async function isFresh(output, sourceMtime) {
  try {
    return (await fs.stat(output)).mtimeMs >= sourceMtime;
  } catch {
    return false;
  }
}

const manifest = { images: {} };
const expected = new Set();
let generated = 0;

const sources = (await walk(srcDir)).filter((f) => IMAGE.test(f));

for (const source of sources) {
  const rel = path.relative(srcDir, source).split(path.sep).join('/');
  const folder = rel.split('/')[0];
  const base = rel.replace(IMAGE, '');
  const { mtimeMs } = await fs.stat(source);

  const meta = await sharp(source).metadata();
  const turned = (meta.orientation ?? 1) >= 5;
  const width = turned ? meta.height : meta.width;
  const height = turned ? meta.width : meta.height;
  if (!width || !height) continue;

  const list = WIDTHS[folder] ?? DEFAULT_WIDTHS;
  const top = Math.min(width, Math.max(...list));
  const targets = [...new Set([...list.filter((w) => w < top), top])].sort((a, b) => a - b);
  const keepsAlpha = Boolean(meta.hasAlpha);
  const fallbackWidth = targets.reduce((best, w) =>
    Math.abs(w - (FALLBACK_WIDTH[folder] ?? 960)) < Math.abs(best - (FALLBACK_WIDTH[folder] ?? 960))
      ? w
      : best,
  );
  const fallbackExt = keepsAlpha ? 'png' : 'jpg';

  const entry = { width, height, avif: [], webp: [], fallback: null };

  const jobs = [
    ...targets.flatMap((w) => [
      { w, ext: 'avif', list: entry.avif },
      { w, ext: 'webp', list: entry.webp },
    ]),
    { w: fallbackWidth, ext: fallbackExt, list: null },
  ];

  for (const job of jobs) {
    const outRel = `${base}-${job.w}.${job.ext}`;
    const outFile = path.join(outDir, outRel);
    const url = `/_media/${outRel}`;
    expected.add(outFile);

    if (!(await isFresh(outFile, mtimeMs))) {
      await fs.mkdir(path.dirname(outFile), { recursive: true });
      const pipeline = sharp(source).rotate().resize({ width: job.w, withoutEnlargement: true });
      if (job.ext === 'avif') pipeline.avif({ quality: 55, effort: 5 });
      if (job.ext === 'webp') pipeline.webp({ quality: 74 });
      if (job.ext === 'jpg') pipeline.jpeg({ quality: 78, mozjpeg: true });
      if (job.ext === 'png') pipeline.png({ compressionLevel: 9, palette: true });
      await pipeline.toFile(outFile);
      generated += 1;
    }

    if (job.list) job.list.push({ src: url, width: job.w });
    else {
      entry.fallback = {
        src: url,
        width: job.w,
        height: Math.round((job.w * height) / width),
      };
    }
  }

  manifest.images[rel] = entry;
}

// Imagen para compartir en redes (1200x630): el póster del hero oscurecido y, si existe, el logo encima.
const poster = sources.find((f) => /hero[\\/]hero-espuma-poster\.(jpe?g|png|webp)$/i.test(f));
if (poster) {
  const ogFile = path.join(outDir, 'og-image.jpg');
  const logo = path.join(srcDir, 'logo/woper-net-logo.png');
  const hasLogo = existsSync(logo);
  const newest = Math.max(
    (await fs.stat(poster)).mtimeMs,
    hasLogo ? (await fs.stat(logo)).mtimeMs : 0,
  );
  expected.add(ogFile);
  if (!(await isFresh(ogFile, newest))) {
    await fs.mkdir(outDir, { recursive: true });
    const veil = {
      input: { create: { width: 1200, height: 630, channels: 4, background: { r: 14, g: 16, b: 18, alpha: 0.82 } } },
    };
    const layers = [veil];
    if (hasLogo) {
      layers.push({
        input: await sharp(logo).resize({ height: 420 }).toBuffer(),
        gravity: 'centre',
      });
    }
    await sharp(poster)
      .rotate()
      .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
      .composite(layers)
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(ogFile);
    generated += 1;
  }
  manifest.ogImage = '/_media/og-image.jpg';
}

// Borra variantes de imágenes que ya no existen.
for (const file of await walk(outDir)) {
  if (!expected.has(file)) await fs.rm(file);
}

await fs.mkdir(path.dirname(manifestFile), { recursive: true });
await fs.writeFile(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`);

const total = Object.keys(manifest.images).length;
console.log(
  `[media] ${total} imagen(es) en public/media, ${generated} archivo(s) generado(s) en public/_media.`,
);
