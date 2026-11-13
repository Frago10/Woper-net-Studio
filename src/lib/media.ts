/*
  Lee el manifiesto que genera scripts/prepare-media.mjs y dice qué medios
  existen en public/media/. Solo se ejecuta al construir el sitio.
*/
import fs from 'node:fs';
import path from 'node:path';

export interface ImageVariant {
  src: string;
  width: number;
}

export interface ImageEntry {
  width: number;
  height: number;
  avif: ImageVariant[];
  webp: ImageVariant[];
  fallback: { src: string; width: number; height: number };
}

interface Manifest {
  images: Record<string, ImageEntry>;
  ogImage?: string;
}

const root = process.cwd();

function readManifest(): Manifest {
  try {
    const file = path.join(root, 'src/data/media.generated.json');
    return JSON.parse(fs.readFileSync(file, 'utf8')) as Manifest;
  } catch {
    return { images: {} };
  }
}

const manifest = readManifest();

/** Imagen optimizada de public/media/, o `undefined` si el archivo no existe. */
export function getImage(file: string): ImageEntry | undefined {
  return manifest.images[file];
}

/** URL pública de un archivo de public/media/ (video, svg), o `undefined` si no existe. */
export function getFile(file: string): string | undefined {
  return fs.existsSync(path.join(root, 'public/media', file)) ? `/media/${file}` : undefined;
}

/** Imagen Open Graph generada desde el póster del hero, si existe. */
export function getOgImage(): string {
  return manifest.ogImage ?? '/og-image.jpg';
}

export const srcset = (variants: ImageVariant[]) =>
  variants.map((v) => `${v.src} ${v.width}w`).join(', ');
