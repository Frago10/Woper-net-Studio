# Woper Net Studio

Landing page de Woper Net Studio, lavado y detallado automotriz en Desamparados, Costa Rica.
Sitio estático hecho con Astro, CSS plano con tokens y JavaScript mínimo.

- Brief completo: [`BRIEF.md`](BRIEF.md)
- Plan de diseño: [`docs/design-plan.md`](docs/design-plan.md)
- Guía para el negocio (editar precios, fotos y desplegar): [`docs/README-cliente.md`](docs/README-cliente.md)
- Datos por confirmar con el cliente: [`docs/pendientes.md`](docs/pendientes.md)

## Requisitos

Node.js 22.18 o superior.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Instala las dependencias |
| `npm run dev` | Servidor de desarrollo en `http://localhost:4321` |
| `npm run build` | Genera el sitio en `dist/` |
| `npm run preview` | Sirve `dist/` para revisarlo |
| `npm run check` | Revisa tipos de TypeScript y Astro |
| `npm run check:contrast` | Verifica el contraste WCAG AA de los tokens de color |
| `npm run check:media` | Lista las fotos y videos que faltan en `public/media/` |
| `npm run media:originales` | Regenera `public/media/` desde `originales/` (difumina placas, recorta hero y logo) |
| `npm test` | Prueba precios, resumen y mensaje de WhatsApp del formulario |
| `npm run test:a11y` | Auditoría con axe-core (requiere Playwright y el sitio en `preview`) |
| `npm run verify` | `check`, `check:contrast`, `test` y `build` en cadena |

`dev` y `build` corren antes `npm run media`, que convierte las imágenes de `public/media/`
a AVIF y WebP en `public/_media/` (carpeta generada, fuera del repositorio).

## Estructura

```
src/
  data/site.ts          Todo el contenido editable: contacto, horario, servicios, precios, galería
  lib/booking.ts        Precios, resumen y mensaje de WhatsApp (funciones puras, con pruebas)
  lib/media.ts          Lee qué medios existen y sus variantes optimizadas
  styles/               tokens.css, base.css, components.css
  components/           Header, Hero, Services, ServiceRow, Domicilio, Gallery, Contact,
                        ContactForm, Footer, MobileBar, MediaPlaceholder y auxiliares
  layouts/Base.astro    <head>, SEO, Open Graph y JSON-LD
  pages/index.astro     La página
  pages/robots.txt.ts   robots.txt con la URL del sitemap
originales/             Logo y fotos tal como los entregó el cliente. No se publican
public/
  media/                Lo que muestra la página (logo, hero, trabajos), generado desde originales/
  favicon.ico, icon-192.png, apple-touch-icon.png, og-image.jpg
scripts/                build-client-media, prepare-media, check-media, check-contrast,
                        check-a11y, booking.test
docs/                   design-plan, pendientes, README-cliente
```

## Despliegue en Vercel

1. En Vercel: **Add New > Project** e importá este repositorio. Vercel detecta Astro.
2. Configuración (ya declarada en `vercel.json`):
   - Build command: `npm run build`
   - Output directory: `dist`
3. En **Settings > Environment Variables** definí `SITE_URL` con el dominio final
   (por ejemplo `https://www.wopernet.com`). Mientras no exista, el sitio usa el dominio
   que Vercel le asigna al proyecto.
4. Para conectar el dominio: **Settings > Domains > Add**, y en el proveedor del dominio
   creá los registros DNS que Vercel indica. Después actualizá `SITE_URL` y volvé a desplegar.

Cada `push` a la rama de producción publica una versión nueva. Las demás ramas generan
una vista previa con su propia URL.

## Cómo crecer después

El sitio es estático hoy, pero está pensado para sumar funciones sin rehacerlo:

- **Formulario al CRM (fase 2).** En `src/components/ContactForm.astro` hay un bloque comentado
  que envía cada solicitud a un webhook (por ejemplo GoHighLevel) además de abrir WhatsApp.
  Se activa con la variable `PUBLIC_FORM_WEBHOOK_URL`.
- **Funciones de servidor.** Con `npx astro add vercel` se agrega el adaptador de Vercel y se
  pueden crear rutas en `src/pages/api/` (reservas, disponibilidad, pagos) sin tocar la página.
- **Componentes interactivos.** Astro admite islas de React, Svelte o Vue con `npx astro add`.
- **Más páginas.** Cada archivo en `src/pages/` es una ruta; `Base.astro` ya resuelve SEO y estilos.
- **Analítica.** Plausible (sin cookies) se activa poniendo el dominio en `analytics.plausibleDomain`
  de `src/data/site.ts`. Ya se registran `whatsapp_click`, `call_click` y `form_submit`.
- **Medios de pago y testimonios.** Los componentes existen y aparecen solos al llenar
  `paymentMethods` y `testimonials` en `src/data/site.ts`.

## Calidad verificada

- Lighthouse móvil: rendimiento 99 a 100, accesibilidad 100, buenas prácticas 100, SEO 100. CLS 0.
- axe-core (WCAG 2.1 A y AA): sin problemas en móvil y escritorio, con el menú abierto y con
  errores del formulario a la vista.
- Sin scroll horizontal a 320 px ni con zoom al 200 %.
- Contraste: 24 pares verificados por `npm run check:contrast`.
