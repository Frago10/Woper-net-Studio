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
| 9 | Archivos originales: logo en vector, más fotos, reels y video del hero | Llegaron el logo (PNG de 500 px) y tres fotos de WhatsApp (1200x1600). Ya están en la página. Faltan: logo en vector, una foto horizontal y oscura en alta resolución para el hero, reels y el video | `originales/` y `npm run media:originales` |
| 10 | Dominio final para canonical, Open Graph y sitemap | El dominio que asigna Vercel | Variable `SITE_URL` en Vercel |

## Detectados durante el desarrollo

| # | Pendiente | Decisión tomada mientras tanto |
|---|---|---|
| 11 | Los flyers dicen "encerrado". Se asume que es "encerado" (aplicación de cera) | La página dice "Encerado" |
| 12 | ¿El precio en sede cambia según el tamaño del vehículo? Los flyers muestran un solo precio por servicio | En sede se cobra el precio del servicio para sedán, SUV y pick up |
| 13 | ¿La restauración de faros se hace a domicilio? | El formulario lo permite y el precio se confirma por WhatsApp |
| 14 | ¿Cuál número es para llamadas? | El botón de llamada usa el 6482-2257 y el de WhatsApp el 8964-7178 |
| 15 | Pies de foto de la galería | "Lavado de espuma", "Después del lavado" y "Secado a mano", escritos a partir de lo que se ve en cada foto. Confirmar con el negocio (`gallery` en `site.ts`) |
| 16 | Autorización de los dueños de los tres carros publicados y de la persona que aparece secando el pick up | Las placas de las dos fotos donde se leían y el número de casa están difuminados. La persona no muestra el rostro |
| 17 | **El lema dentro del archivo del logo dice "AL CUIDADO AUTOMOTPIZ"** (una P en lugar de la R) | La página usa el logo recortado sin esa línea. Conviene pedir el archivo corregido, idealmente en vector (SVG) |
| 19 | La foto del hero es de WhatsApp (1200 px de ancho) | En pantallas grandes se ve algo suave. Con un original horizontal de 2400 px o más mejora mucho |
| 20 | Los originales con las placas visibles están en `originales/`, dentro del repositorio | Si el repositorio es público, conviene borrar esa carpeta o hacerlo privado. El sitio publicado no los incluye |
| 18 | El formulario avisa si la fecha elegida en sede no es sábado ni domingo | No bloquea el envío. Si hay horario entre semana, se ajusta en `hours.weekdays` |

## Ajustes respecto al brief

- **Titular en pantallas de menos de 360 px:** baja de 3 rem a 2,625 rem para que "Es cuidado."
  quepa en una línea a 320 px.
- **Tamaño del titular:** `clamp(3rem, 2rem + 4.4vw, 6.5rem)` en lugar de `clamp(3rem, 8vw, 7.5rem)`.
  Con `8vw` las dos líneas ocupaban casi todo el ancho y el scrim tapaba la foto entera; así el
  texto queda a la izquierda y el carro se ve a la derecha.
- **Hero con dos recortes:** uno horizontal para pantallas anchas y uno vertical para móvil
  (`posterMobile` en `site.ts`), porque una sola foto no encuadra bien en los dos formatos.
- **Velo sobre la foto del hero:** `--tinte-hero` (32 % de asfalto) oscurece la foto para que se
  lea como escena. La foto actual es de día y con paredes claras.
- **Galería con 3 fotos:** son las que hay. El brief pide 6 a 8; se completa cuando lleguen más.
- **Botón "Agendar" de la cabecera:** se muestra desde 768 px. En móvil la acción vive en la barra fija.
- **Barra fija móvil:** aparece cuando el hero sale de pantalla y se oculta en contacto y footer.
  Como nunca tapa contenido, no se agregó padding inferior al `main`.
- **Scrim del hero:** va anclado al bloque de texto con opacidad mínima de 0,86, para garantizar
  4,5:1 aunque la foto sea espuma blanca. En móvil cubre todo el ancho; desde 1024 px se
  desvanece hacia la derecha.
- **Video del hero:** arranca cuando termina la barra de luz (2,6 s después de cargar), así el
  póster es el LCP y los tres momentos no se pisan.
- **Tokens añadidos:** `--blanco`, `--linea-oscura`, `--linea-clara`, `--scrim-texto`,
  `--scrim-cabecera`, `--tinte-hero`, `--luz-pico`, `--luz-fuerte`, `--luz-suave`, `--brillo-vacio`. Ningún valor del brief cambió:
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
