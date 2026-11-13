# Pendientes para confirmar con el cliente

Nada de esto bloquea el desarrollo. La página muestra solo lo verificado en el perfil y los
flyers; cada punto dice dónde se cambia cuando llegue la respuesta.

## Del brief

| # | Pendiente | Qué muestra hoy la página | Dónde se cambia |
|---|---|---|---|
| 1 | Lista completa de lo que incluyen el Lavado básico y el Lavado premium (los flyers salían recortados) | Básico: lavado exterior y aspirado interior. Premium: además limpieza de vidrios y encerado | `services` en `src/data/site.ts` |
| 2 | Precios a domicilio: ¿son el total para Premium y Full detailing, o un recargo? Hoy un sedán a domicilio cuesta lo mismo que el Full detailing en sede | Los precios del flyer tal cual: Sedán ₡12.000, SUV ₡15.000, Pick up ₡18.000, como total | `vehicles[].homePrice` en `site.ts`. Si es recargo, también `quote()` en `src/lib/booking.ts` |
| 3 | Medios de pago aceptados (destacado "Medio de pago") | Nada. La sección está oculta | `paymentMethods` en `site.ts` |
| 4 | Clientes y testimonios autorizados, y permiso para publicar fotos de carros ajenos | Nada. La sección está oculta | `testimonials` en `site.ts` |
| 5 | Contenido del destacado "Contacto" y si hay horario entre semana o para domicilio | Sábados y domingos, de 7:00 a. m. a 3:00 p. m. | `hours` en `site.ts` |
| 6 | Dirección exacta y punto en el mapa de Calle Fallas, Desamparados | "Calle Fallas, Desamparados" y un enlace a la búsqueda en Google Maps | `location` en `site.ts` |
| 7 | Número de WhatsApp para el enlace con mensaje (se asume +506 8964-7178) y si el handle "wopernet_st…" de los flyers es otra cuenta | wa.me/50689647178 e Instagram @wopernet | `contact` en `site.ts` |
| 8 | Precio o rango de la restauración de faros y de otros trabajos sin precio publicado | "Te confirmamos el precio por WhatsApp" | `services` (precio de `faros`) en `site.ts` |
| 9 | Archivos originales: logo en vector o PNG transparente, fotos, reels y video del hero | Emblema provisional dibujado y paneles vacíos en hero y galería | `public/media/` (ver `npm run check:media`) |
| 10 | Dominio final para canonical, Open Graph y sitemap | El dominio que asigna Vercel | Variable `SITE_URL` en Vercel |

## Detectados durante el desarrollo

| # | Pendiente | Decisión tomada mientras tanto |
|---|---|---|
| 11 | Los flyers dicen "encerrado". Se asume que es "encerado" (aplicación de cera) | La página dice "Encerado" |
| 12 | ¿El precio en sede cambia según el tamaño del vehículo? Los flyers muestran un solo precio por servicio | En sede se cobra el precio del servicio para sedán, SUV y pick up |
| 13 | ¿La restauración de faros se hace a domicilio? | El formulario lo permite y el precio se confirma por WhatsApp |
| 14 | ¿Cuál número es para llamadas? | El botón de llamada usa el 6482-2257 y el de WhatsApp el 8964-7178 |
| 15 | Pies de foto de la galería | Son provisionales. Se ajustan cuando lleguen las fotos reales (`gallery` en `site.ts`) |
| 16 | Autorización de cada foto o video con placas, rostros o carros de otras personas | Antes de publicar, difuminar las placas legibles |
| 17 | El emblema de la cabecera y el favicon son provisionales | Se reemplazan solos al copiar `logo/woper-net-emblema.svg` en `public/media/`. El favicon (`public/favicon.svg`) se cambia a mano |
| 18 | El formulario avisa si la fecha elegida en sede no es sábado ni domingo | No bloquea el envío. Si hay horario entre semana, se ajusta en `hours.weekdays` |

## Ajustes respecto al brief

- **Titular en pantallas de menos de 360 px:** baja de 3 rem a 2,625 rem para que "Es cuidado."
  quepa en una línea a 320 px.
- **Titular en escritorio:** ocupa el ancho que necesitan sus dos líneas en vez de las columnas
  1 a 8. Con `8vw` la primera línea no cabe en 8 columnas; se priorizó el tamaño y las dos líneas.
- **Botón "Agendar" de la cabecera:** se muestra desde 768 px. En móvil la acción vive en la barra fija.
- **Barra fija móvil:** aparece cuando el hero sale de pantalla y se oculta en contacto y footer.
  Como nunca tapa contenido, no se agregó padding inferior al `main`.
- **Scrim del hero:** va anclado al bloque de texto con opacidad mínima de 0,86 en todo el ancho,
  para garantizar 4,5:1 aunque la foto sea espuma blanca. Con una foto oscura casi no se nota.
- **Video del hero:** arranca cuando termina la barra de luz (2,6 s después de cargar), así el
  póster es el LCP y los tres momentos no se pisan.
- **Tokens añadidos:** `--blanco`, `--linea-oscura`, `--linea-clara`, `--scrim-texto`,
  `--scrim-cabecera`, `--luz-fuerte`, `--luz-suave`, `--brillo-vacio`. Ningún valor del brief cambió:
  todos los pares pasaron `check-contrast` sin ajustes.
- **Signo ₡:** no viene en el subconjunto latino de Archivo. Se extrajo a un archivo de 2 KB
  (`src/fonts/archivo-colon-wdth.woff2`) para no cargar el subconjunto extendido de 86 KB.
- **`check:media`:** no forma parte de `build`, para que las vistas previas en Vercel funcionen
  mientras faltan medios. Antes del lanzamiento: `npm run check:media -- --strict`.

## Regla de Chanel: lo que se quitó

Los filetes de 1 px encima de la primera fila de cada lista (gama de servicios, pasos, precios
por vehículo y datos de contacto) y el filete bajo la lista de vehículos. Los filetes quedan
solo **entre** filas, que es donde separan información; el espacio bajo cada título ya hacía
el trabajo de los que se fueron.
