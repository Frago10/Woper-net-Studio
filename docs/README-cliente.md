# Guía para Woper Net Studio

Cómo cambiar precios y teléfonos, cómo poner las fotos y cómo publicar la página.

## 1. Cambiar un precio, un teléfono o el horario

Todo el contenido está en un solo archivo: **`src/data/site.ts`**.

| Quiero cambiar | Busco en `site.ts` | Ejemplo |
|---|---|---|
| El precio de un servicio en sede | `services`, campo `price` | `price: 8000` |
| El precio a domicilio por vehículo | `vehicles`, campo `homePrice` | `homePrice: 15000` |
| Lo que incluye un servicio | `services`, lista `includes` | `'Limpieza de vidrios'` |
| El WhatsApp | `contact.whatsapp` | `display`, `international` y `schema` |
| El teléfono | `contact.phone` | `display`, `international` y `schema` |
| El horario | `hours` | `days`, `time`, `weekdays` y `schema` |
| La dirección | `location` | `street`, `district`, `mapsQuery` |
| Medios de pago | `paymentMethods` | `[{ name: 'Efectivo' }]` |
| Testimonios | `testimonials` | `[{ quote: '...', author: 'Nombre' }]` |

Reglas:

- Los precios se escriben como número entero, sin puntos ni comas: `12000`. La página los
  muestra sola como `₡12.000`.
- Un teléfono tiene tres formas y hay que cambiar las tres: `display` (como se lee, `8964-7178`),
  `international` (código de país y número, solo dígitos, `50689647178`) y `schema` (`+506 8964-7178`).
- Medios de pago y testimonios están vacíos. La sección aparece sola cuando se agregan.
- Después de cambiar un precio, `npm test` avisa si alguna prueba esperaba el valor anterior;
  actualizá el número en `scripts/booking.test.mjs`.

El cambio se publica al guardar el archivo en GitHub (ver sección 3).

## 2. Poner el logo, las fotos y los videos

Hay dos carpetas:

- **`originales/`**: los archivos tal como llegaron (logo y fotos de WhatsApp). No se publican.
- **`public/media/`**: lo que la página muestra. Se genera desde `originales/` con
  `npm run media:originales`, que difumina las placas, recorta la foto del hero y recorta el logo.

Hoy la página usa esto:

```
public/media/
  logo/woper-net-emblema.png          la llanta, para la cabecera
  logo/woper-net-logo.png             llanta y nombre, para el footer
  hero/hero-espuma-poster.jpg         foto horizontal del hero (pantallas anchas)
  hero/hero-espuma-poster-movil.jpg   recorte vertical del hero (celular)
  trabajos/01-lavado-espuma.jpg
  trabajos/02-despues-del-lavado.jpg
  trabajos/03-secado-a-mano.jpg
```

**Agregar una foto a la galería**

1. Copiá la foto en `public/media/trabajos/` (1600 px en el lado largo, `.jpg` o `.webp`).
   Si tiene una placa legible, difuminala antes, o ponela en `originales/` y agregala a la lista
   `PHOTOS` de `scripts/build-client-media.mjs` con la zona a difuminar.
2. En `src/data/site.ts`, agregá un elemento a `gallery` con `file`, `alt` (qué se ve, para
   lectores de pantalla) y `caption` (el pie visible).

**Agregar un reel:** copiá el `.mp4` vertical (1080x1920) y una portada `.jpg` con el mismo nombre.
En `gallery` hay un ejemplo comentado listo para copiar.

**Cambiar la foto del hero:** lo ideal es una foto horizontal, oscura, de 2400x1350 o más, guardada
como `hero/hero-espuma-poster.jpg`, y un recorte vertical de 1080x1920 como
`hero/hero-espuma-poster-movil.jpg`. La actual viene de WhatsApp y en pantallas grandes se ve suave.

**Agregar el video del hero (opcional):** `hero/hero-espuma.mp4` y `hero/hero-espuma.webm`, 1080p,
8 a 12 segundos, sin audio, máximo 4 MB. Sin video, el hero muestra la foto fija.

Otros datos:

- La página genera sola las versiones livianas (AVIF y WebP) para cada tamaño de pantalla.
- Si un archivo de la galería no existe, la página muestra un panel gris en su lugar.
- Para ver qué falta: `npm run check:media`.
- La imagen que se ve al compartir el enlace en WhatsApp o redes se genera sola con el logo
  sobre la foto del hero.
- El ícono de la pestaña (`favicon.ico`, `icon-192.png`, `apple-touch-icon.png`) sale del logo
  con `npm run media:originales`.

**Antes de publicar una foto o un video:** confirmá que tenés permiso de la persona dueña del
carro y difuminá las placas legibles y los rostros.

## 3. Publicar la página

La página se aloja en Vercel y se publica sola desde GitHub.

**Primera vez**

1. Entrá a vercel.com con la cuenta de GitHub.
2. **Add New > Project** y elegí el repositorio `Woper-net-Studio`.
3. Dejá la configuración como viene (Astro, `npm run build`, carpeta `dist`) y dale **Deploy**.
4. En unos minutos queda una dirección del tipo `woper-net-studio.vercel.app`.

**Conectar un dominio propio**

1. En el proyecto de Vercel: **Settings > Domains > Add** y escribí el dominio.
2. Vercel muestra uno o dos registros DNS. Se copian en el panel donde se compró el dominio.
3. En **Settings > Environment Variables** agregá `SITE_URL` con el dominio completo
   (por ejemplo `https://www.wopernet.com`) y volvé a desplegar desde **Deployments > Redeploy**.

**Cada cambio después**

Guardar un cambio en la rama principal de GitHub publica una versión nueva en uno o dos minutos.
Si algo sale mal, en **Deployments** se puede volver a la versión anterior con **Promote**.

## 4. Revisar antes de lanzar

```
npm run check:media -- --strict    que no falte ninguna foto ni video
npm run verify                     tipos, contraste, precios y compilación
```

Y a mano, desde el celular: tocar "Agendar por WhatsApp", llenar el formulario y confirmar que
WhatsApp se abre con el mensaje correcto.

## 5. Lo que falta confirmar

La lista está en [`pendientes.md`](pendientes.md). Los más importantes para lanzar: los archivos
originales (logo, fotos, video), qué incluye cada lavado, si el precio a domicilio es total o
recargo, y el dominio.
