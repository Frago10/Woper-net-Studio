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

Los archivos van en **`public/media/`**, con estos nombres exactos:

```
public/media/
  logo/woper-net-emblema.svg      la llanta (o .png transparente de 1024 px)
  logo/woper-net-wordmark.svg     el nombre (opcional)
  hero/hero-espuma-poster.jpg     2400x1350, foto oscura del carro con espuma
  hero/hero-espuma.mp4            1080p, 8 a 12 s, sin audio, máximo 4 MB
  hero/hero-espuma.webm           el mismo video en WebM
  trabajos/01-lavado-espuma.jpg
  trabajos/02-lavado-paso-a-paso.mp4   reel vertical 1080x1920
  trabajos/02-lavado-paso-a-paso.jpg   portada del reel (recomendada)
  trabajos/03-rines-llantas.jpg
  trabajos/04-restauracion-faros.mp4
  trabajos/04-restauracion-faros.jpg
  trabajos/05-encerado.jpg
  trabajos/06-detalle-llantas.jpg
```

- Fotos: 1600 px en el lado largo, `.jpg` o `.webp`. La página genera sola las versiones
  livianas (AVIF y WebP) para cada tamaño de pantalla.
- Mientras un archivo no exista, la página muestra un panel gris en su lugar.
- Para ver qué falta: `npm run check:media`.
- Para cambiar una foto, su texto o el orden de la galería, editá `gallery` en `src/data/site.ts`.
  Cada foto lleva `alt` (qué se ve, para lectores de pantalla) y `caption` (el pie visible).
- El hero funciona solo con el póster. El video es opcional: sin él queda la foto fija.
- La imagen que se ve al compartir el enlace en WhatsApp o redes se genera sola a partir del
  póster del hero.
- El ícono de la pestaña del navegador es `public/favicon.svg`. Cuando llegue el logo final,
  hay que reemplazar ese archivo, `favicon.ico` y `apple-touch-icon.png`.

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
