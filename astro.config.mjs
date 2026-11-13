import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Dominio final: definí SITE_URL en Vercel (Settings > Environment Variables).
// Si no existe, se usa el dominio de producción que Vercel asigna al proyecto.
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site =
  process.env.SITE_URL || (vercelHost ? `https://${vercelHost}` : 'http://localhost:4321');

export default defineConfig({
  site,
  output: 'static',
  build: {
    // El CSS completo pesa pocos KB: va en línea para ahorrar una petición bloqueante.
    inlineStylesheets: 'always',
  },
  integrations: [sitemap()],
});
