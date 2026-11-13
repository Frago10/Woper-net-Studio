# Prompt para Claude Code: landing page de Woper Net Studio

**Cómo usarlo**

1. Crea una carpeta vacía para el proyecto y ábrela con Claude Code.
2. Copia en `public/media/` las fotos, videos y el logo originales del cliente (ver sección 8). Si todavía no los tienes, empieza igual: el prompt prevé placeholders y un comando que lista lo que falta.
3. Pega todo lo que está debajo de la línea en Claude Code. Guarda también una copia como `BRIEF.md` en la raíz para que sirva de referencia durante todo el trabajo.

Lo que viene marcado como **(confirmar)** son datos que no se pudieron verificar en el perfil público de Instagram; están reunidos en la sección 15.

---

# 1. Rol y objetivo

Eres el diseñador y desarrollador front-end principal de un estudio que entrega sitios con identidad propia, no plantillas. Vas a construir la landing page de **Woper Net Studio**, un negocio costarricense de lavado y detallado automotriz que hoy vive solo en Instagram (@wopernet). El resultado debe verse como la página de una marca premium del sector automotriz (referencia de calidad: las webs de BMW y Mercedes-Benz), pero escalada a un negocio local: sobria, cinematográfica, con mucho aire, fotografía protagonista y cero ruido.

**Trabajo principal de la página:** que una persona que llega desde Instagram o Google entienda en 10 segundos qué ofrece Woper Net, cuánto cuesta, dónde está y cómo agendar por WhatsApp.

**Público:** dueños de carro en el Gran Área Metropolitana de Costa Rica, sobre todo en San José y Desamparados, que navegan desde el celular. Diseña mobile first: se asume que la mayoría de las visitas serán desde el celular.

**Idioma:** español de Costa Rica (`lang="es-CR"`). Tono cercano, directo y seguro, sin jerga de marketing. Usa voseo en los imperativos, igual que los flyers del cliente ("Agendá tu servicio", "Vos facilitás el agua"), y mantenlo consistente en toda la página. No mezcles tuteo y voseo.

# 2. Datos verificados del negocio

Todo lo de esta tabla se leyó en el perfil público de Instagram y en los flyers publicados. Úsalo tal cual. No inventes nada más.

| Dato | Valor |
|---|---|
| Nombre | Woper Net Studio |
| Lema del logo | "Al cuidado automotriz" |
| Frase de marca (flyer Full Detailing) | "Más que un lavado. Es cuidado." |
| Bio de Instagram | "Lavado \| Detallado \| Automotriz. Te gusta cuidar tu carro, nos encargamos. Productos de alta calidad. Lavado y Detallado, agenda ya." |
| Instagram | @wopernet, https://www.instagram.com/wopernet (los flyers muestran un handle cortado que empieza con "wopernet_st"; **confirmar** si existe otra cuenta) |
| WhatsApp principal | 8964-7178 |
| Segundo teléfono | 6482-2257 |
| Enlace de WhatsApp de la bio | https://wa.me/qr/STUI7NYWKGGGH1 |
| Ubicación (flyer Full Detailing) | Desamparados, Calle Fallas **(confirmar** dirección exacta y punto en el mapa) |
| Horario en sede | Sábados y domingos, de 7:00 a. m. a 3:00 p. m. **(confirmar** si hay horario entre semana o para domicilio) |
| Cobertura a domicilio | San José y alrededores |
| Productos | "Productos de alta calidad". En Full Detailing, "uso exclusivo de productos Meguiar's" |

Para los enlaces de WhatsApp con mensaje prellenado usa `https://wa.me/50689647178?text=...`. Parte de que 8964-7178 es un celular de Costa Rica (+506); **confirmar** con el cliente. El enlace `wa.me/qr/...` queda como respaldo en el footer.

# 3. Servicios y precios (de los flyers del cliente)

Monedas en colones (₡). Usa un único formato en toda la página: `₡5.000`, `₡8.000`, `₡12.000` (punto como separador de miles; los flyers mezclan coma y punto). Guarda los números como enteros y formatea con una función única.

**Servicios en sede (Desamparados)**

1. **Lavado básico, ₡5.000.** Lleva lavado exterior y aspirado interior. El flyer recortaba el resto de la lista. **(confirmar** si incluye algo más).
2. **Lavado premium, ₡8.000.** Lavado exterior, aspirado interior, limpieza de vidrios y encerrado. En el flyer solo se leía "Limpieza de..." cortado; "vidrios" se asume por el flyer de Full Detailing. **(confirmar)**
3. **Full detailing con Meguiar's, ₡12.000.** Limpieza profunda, lavado exterior, aspirado interior, limpieza de vidrios, encerrado, impermeabilización de parabrisas, protección de partes negras. Uso exclusivo de productos Meguiar's. Cierre del flyer: "Más que un lavado. Es cuidado."

**Lavado a domicilio**

- Aplica para **Lavado premium** y **Full detailing**.
- Precio por tipo de vehículo: **Sedán ₡12.000, SUV ₡15.000, Pick up ₡18.000**.
- Cobertura: San José y alrededores.
- Cómo funciona (esto sí es una secuencia, se numera): 1. Contáctanos por WhatsApp. 2. Coordinamos tu cita. 3. Vamos hasta tu domicilio. 4. Realizamos el servicio en la comodidad de tu hogar.
- Condiciones: Woper Net lleva los productos de limpieza; el cliente facilita el suministro de agua y electricidad.
- **Confirmar** con el cliente: el flyer es ambiguo sobre si esos precios por vehículo son el total del servicio a domicilio para ambos paquetes (hoy sedán a domicilio sale igual que el Full Detailing en sede). Mientras no se aclare, muestra los precios tal como están en el flyer y deja la nota en `docs/pendientes.md`.

**Otros trabajos visibles en el feed, sin precio publicado**

- Restauración de faros con polímero (reel "Restauración con polímero 10/10").
- Cuidado de llantas y rines, y lavado de espuma en carros de varias marcas (fotos y reels).
Muéstralos como "También hacemos" con la invitación a consultar por WhatsApp. No inventes precios.

# 4. Dirección de diseño

## 4.1 Qué tomar de BMW y Mercedes-Benz

- Hero a pantalla completa, fotográfico, con un único titular grande y una acción clara.
- Aire: márgenes generosos, secciones de 96 a 200 px de alto de respiro, nada apretado.
- Tipografía ancha y ligera en tamaños grandes, con muy pocos pesos en juego.
- Paleta contenida y alternancia de secciones oscuras y claras para marcar ritmo.
- La oferta presentada como una "gama de modelos" (filas amplias de comparación), no como una cuadrícula de tarjetas idénticas.
- Cabecera mínima, transparente sobre el hero y sólida al hacer scroll.
- Movimiento escaso y elegante. Fotografía primero, texto después.

## 4.2 Qué no copiar

Ni logos, ni tipografías propietarias, ni maquetas literales, ni imágenes de BMW o Mercedes. Tampoco uses logos de Meguiar's: su nombre puede aparecer como texto porque el cliente lo declara en su flyer, y nada más.

## 4.3 Identidad del cliente

El logo de Woper Net Studio es una llanta con pinza de freno roja, el wordmark "WOPER NET" en cursiva con efecto cromado y rojo, y la banda "AL CUIDADO AUTOMOTRIZ". La paleta de la marca es **negro, rojo y cromo/blanco**. Respétala, pero con disciplina: el rojo es una señal, no un tema. Aparece solo en botones primarios, en líneas de énfasis y en el emblema.

## 4.4 La única apuesta fuerte

Gasta la audacia en un solo lugar: **el hero**. Una imagen o video a pantalla completa de un carro oscuro cubierto de espuma, con el titular en tipografía ancha y ligera. Al cargar, una sola barra de luz suave recorre la carrocería de izquierda a derecha, como el barrido de una luz de showroom sobre pintura mojada (1,6 s, una vez, sin repetirse). Todo lo demás es quieto y disciplinado.

# 5. Sistema de diseño

Define todos los valores como variables CSS en `src/styles/tokens.css`. Ningún color ni tamaño suelto en los componentes.

## 5.1 Color

| Token | Hex | Uso |
|---|---|---|
| `--asfalto` | `#0E1012` | Fondo oscuro principal y tinta sobre fondo claro |
| `--grafito` | `#1A1D21` | Superficies elevadas sobre oscuro (panel del formulario, tiles) |
| `--ceramica` | `#F2F3F4` | Fondo claro principal y texto sobre oscuro |
| `--cromo` | `#A9AFB6` | Texto secundario sobre oscuro |
| `--acero` | `#5B626A` | Texto secundario sobre claro |
| `--borde-oscuro` | `#7B828A` | Bordes de controles sobre oscuro |
| `--rojo` | `#D4141C` | Relleno de botón primario, líneas de énfasis, emblema |
| `--rojo-hover` | `#B50F16` | Hover y estado presionado del botón primario |

Reglas de contraste (WCAG 2.1 AA): texto normal 4,5:1 o más, texto grande y componentes de interfaz 3:1 o más. El rojo `#D4141C` sobre `--asfalto` queda cerca de 3,6:1, así que **no lo uses para texto pequeño sobre oscuro**; úsalo como relleno con texto blanco (aprox. 5,4:1) o como línea decorativa. Escribe un script `scripts/check-contrast.mjs` que calcule las razones de todos los pares usados y falle si alguno no cumple. Si un valor no pasa, ajústalo y anota el cambio.

Ritmo de secciones: hero oscuro, servicios claro, domicilio oscuro, trabajos claro, contacto oscuro, footer oscuro.

Evita degradados decorativos, sombras suaves genéricas y tintes cálidos o crema. Las únicas transiciones de color permitidas son los scrims sobre fotografía para asegurar contraste del texto.

## 5.2 Tipografía

Una sola familia con carácter: **Archivo** (variable, eje de ancho `wdth` y eje de peso). Auto-hospédala con `@fontsource-variable/archivo` (variante con eje `wdth`; verifica que el eje exista) y precarga solo el archivo de los titulares. `font-display: swap`. Si el eje `wdth` no estuviera disponible, usa Archivo normal y compensa con espaciado de letras.

- Titulares: ancho 118 a 125, peso 300 (ligero), interletrado -0,02 em, interlineado 0,95 a 1,05. Tipografía como protagonista, no como vehículo neutro.
- Cuerpo y UI: ancho 100, peso 400; subtítulos y etiquetas funcionales en peso 500.
- Precios: ancho 125, peso 500, `font-variant-numeric: tabular-nums`.
- Escala fluida: display `clamp(3rem, 8vw, 7.5rem)`; h2 `clamp(2.25rem, 4.5vw, 4rem)`; h3 `clamp(1.5rem, 2vw, 2rem)`; cuerpo 1,0625 rem con interlineado 1,65; texto pequeño 0,9375 rem. Mínimo 16 px en móvil.
- Medida de línea: máximo 62 caracteres (`max-width: 62ch`) en párrafos.
- **Alineación: todo a la izquierda.** Nada centrado, salvo el contenido de un diálogo si lo requiere.
- Frases en sentence case. Sin mayúsculas sostenidas en etiquetas, sin etiquetas decorativas encima de los titulares ("eyebrows"), sin acentuar una sola palabra de un titular con color, cursiva o negrita, sin flechas "→" añadidas al texto de los botones, sin cadenas separadas por puntos medios ("A · B · C").

## 5.3 Espaciado, rejilla y forma

- Base de 4 px. Escala: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160.
- Rejilla de 12 columnas, ancho máximo 1440 px, márgenes laterales `clamp(20px, 5vw, 80px)`.
- Padding vertical de sección: `clamp(96px, 12vw, 200px)`. Define **una sola** clase `.section` para esto y no la sobrescribas con selectores de tipo.
- Bordes: fotografía y video con esquinas rectas (0 px); controles (botones, campos) con 4 px. Una línea fina (1 px) solo cuando sea información: separar filas de la gama de servicios y los ítems de contacto.
- Botón primario: relleno `--rojo`, texto blanco, 56 px de alto, peso 500, sin flecha. Botón secundario: contorno 1 px (blanco sobre oscuro, tinta sobre claro). Objetivo táctil mínimo 44×44 px.
- Foco visible siempre: contorno de 3 px con desfase de 3 px, blanco sobre oscuro y `--asfalto` sobre claro.

## 5.4 Movimiento

- Un único momento orquestado al cargar: el titular del hero aparece por líneas con máscara (700 ms, escalonado) y después pasa la barra de luz sobre la imagen (1,6 s, una vez).
- Nada de entradas "fade-up" en cada sección, ni parallax, ni hover animado en todas las tarjetas, ni carruseles con avance automático.
- Se permite el movimiento que responde a una acción: abrir el menú móvil, abrir y cerrar el visor de la galería, estados hover y presionado de botones (150 ms), la cabecera que se vuelve sólida al hacer scroll.
- Respeta `prefers-reduced-motion: reduce`: sin barra de luz, sin máscara, el video del hero se sustituye por su póster.

# 6. Arquitectura de la página (una sola página con anclas)

Marca con landmarks semánticos: `header`, `nav`, `main`, `section` con `aria-labelledby`, `footer`. Incluye un enlace "Saltar al contenido" como primer elemento enfocable.

## 6.1 Cabecera

Altura 72 px. Emblema del logo (la llanta) y wordmark a la izquierda. Navegación: **Servicios, A domicilio, Trabajos, Contacto**. A la derecha, botón primario "Agendar". Transparente sobre el hero y sólida (`--asfalto` con borde inferior de 1 px) pasados 80 px de scroll. En móvil: botón de menú que abre una capa a pantalla completa con foco atrapado, cierre con Escape y devolución del foco al botón.

## 6.2 Hero (oscuro, 100 svh, mínimo 640 px)

```
+--------------------------------------------------------------+
| [logo]                  Servicios  A domicilio  Trabajos  [Agendar] |
|                                                              |
|   (imagen o video a pantalla completa: carro oscuro con espuma)
|                                                              |
|   Más que un lavado.                                         |
|   Es cuidado.                                                |
|   Lavado y detallado automotriz en Desamparados.             |
|   También vamos a tu casa en San José y alrededores.         |
|   [Agendar por WhatsApp]  [Ver servicios]                    |
|--------------------------------------------------------------|
| Sábados y domingos      | Calle Fallas,       | Servicio a     |
| 7:00 a. m. a 3:00 p. m. | Desamparados        | domicilio      |
+--------------------------------------------------------------+
```

- H1: "Más que un lavado. Es cuidado." en dos líneas, columnas 1 a 8, anclado abajo a la izquierda.
- Subtítulo máximo 52 caracteres de ancho: "Lavado y detallado automotriz en Desamparados. También vamos a tu casa en San José y alrededores."
- Botones: "Agendar por WhatsApp" (primario) y "Ver servicios" (secundario).
- Franja inferior con tres datos reales: horario, ubicación y cobertura a domicilio. Texto en dos líneas (dato en peso 500, detalle en `--cromo`). Divisores verticales finos solo en escritorio.
- Medio: video corto, mudo, en bucle, `playsinline`, con póster. Debe incluir un botón visible de pausa (WCAG 2.2.2). Scrim degradado solo en el tercio inferior izquierdo para asegurar el contraste del texto (4,5:1 mínimo sobre la zona más clara).
- El LCP debe ser el póster o la imagen. Precárgalo con `fetchpriority="high"`.

## 6.3 Servicios (claro)

H2: "Servicios y precios". Debajo, una línea: "Elegí según cuánto cuidado necesita tu carro."

Presenta los tres servicios en sede como **gama de modelos**: filas de ancho completo, no tarjetas. Cada fila: nombre (h3) y una descripción de una frase a la izquierda (columnas 1 a 4); lista de lo que incluye con iconos de check SVG en el centro (columnas 5 a 9); precio grande y botón "Reservar" a la derecha (columnas 10 a 12). Separa las filas con una línea de 1 px.

```
+--------------------------------------------------------------+
| Lavado básico         | Lavado exterior        |  ₡5.000     |
| Lo esencial para un   | Aspirado interior      |  [Reservar] |
| carro limpio.         |                        |             |
|--------------------------------------------------------------|
| Lavado premium        | Lavado exterior        |  ₡8.000     |
| ...                   | Aspirado interior      |  [Reservar] |
|                       | Limpieza de vidrios    |             |
|                       | Encerrado              |             |
|--------------------------------------------------------------|
| [fila oscura] Full detailing con Meguiar's  ... ₡12.000      |
+--------------------------------------------------------------+
```

- La fila de **Full detailing** va sobre panel `--asfalto` dentro de la sección clara: es el modelo insignia y rompe la monotonía sin decorar. Su descripción: "Cuidado profundo con productos Meguiar's, de la pintura al parabrisas." Debajo, la frase "Uso exclusivo de productos Meguiar's." (texto, sin logo).
- Descripciones de una frase, solo con hechos del flyer: Básico "Lo esencial para un carro limpio por dentro y por fuera."; Premium "Limpieza completa con vidrios impecables y encerado."
- "Reservar" abre el formulario de la sección 6.6 con el servicio preseleccionado y hace scroll suave al formulario (sin scroll suave si hay reducción de movimiento).
- Cierre de la sección: una línea "También restauramos faros con polímero y cuidamos llantas y rines. Consultá por WhatsApp." con enlace de texto a WhatsApp con mensaje prellenado sobre ese tema. Sin precios.

## 6.4 A domicilio (oscuro)

H2: "Vamos hasta tu casa." Subtítulo: "Nosotros llevamos los productos de limpieza. Vos facilitás el agua y la electricidad."

Dos columnas en escritorio, una en móvil:

- **Izquierda, "Cómo funciona":** los 4 pasos numerados (aquí la numeración es información: es una secuencia real). Paso, texto corto: Contáctanos por WhatsApp. Coordinamos tu cita. Vamos hasta tu domicilio. Realizamos el servicio en la comodidad de tu hogar. (Cambia "Contáctanos" a "Escribinos" si mantienes el voseo.)
- **Derecha, precios por vehículo:** tres líneas grandes, una por tipo: Sedán ₡12.000, SUV ₡15.000, Pick up ₡18.000. Nota bajo la lista: "Aplica para Lavado premium y Full detailing. Cobertura en San José y alrededores."
- Botón primario "Agendar a domicilio", que abre el formulario con "A domicilio" preseleccionado.
- Iconos de vehículo en SVG de línea (sedán, SUV, pick up), propios y genéricos, sin siluetas de marcas.

## 6.5 Trabajos (claro)

H2: "Trabajos recientes." Subtítulo: "Lavados, llantas, faros y detallados hechos por Woper Net Studio."

Cuadrícula editorial de 6 a 8 elementos con proporciones mezcladas (4:5 para fotos, 9:16 para reels), sin radios. Al hacer clic se abre un visor con el elemento `<dialog>` nativo: foco atrapado, cierre con Escape, flechas izquierda y derecha para navegar, videos con controles y sin sonido automático. Cada elemento lleva un pie descriptivo y texto alternativo real, por ejemplo: "Lavado y aspirado, paso a paso", "Restauración de faros con polímero", "Rines y llantas después del lavado". Al final, un enlace de texto "Ver más en Instagram" a https://www.instagram.com/wopernet (se abre en pestaña nueva con `rel="noopener"`).

Si aún no hay medios, la cuadrícula usa placeholders (sección 8). **No uses fotos de stock** ni imágenes de otros talleres.

## 6.6 Contacto y agenda (oscuro)

H2: "Agendá tu servicio." Dos columnas en escritorio.

**Columna izquierda, datos:** lista con WhatsApp 8964-7178 (enlace `https://wa.me/50689647178`), teléfono 6482-2257 (`tel:+50664822257`), Instagram @wopernet, dirección "Calle Fallas, Desamparados" y horario "Sábados y domingos, de 7:00 a. m. a 3:00 p. m.". Una tarjeta-enlace "Abrir en Google Maps" que lleve a una búsqueda por "Calle Fallas, Desamparados, San José, Costa Rica" (no incrustes iframe de mapa: es más lento y no tienes el punto exacto; **confirmar**).

**Columna derecha, formulario de agenda** (panel `--grafito`). No hay backend: arma un mensaje y abre WhatsApp.

- Servicio: selector con Lavado básico, Lavado premium, Full detailing con Meguiar's, Restauración de faros, Otra consulta.
- Vehículo: grupo de radios con Sedán, SUV, Pick up.
- Dónde: radios "En Desamparados" y "A domicilio".
- Fecha preferida (opcional) y nombre (opcional).
- Resumen en vivo en una frase, por ejemplo: "Lavado premium para sedán, a domicilio: ₡12.000." El precio se calcula con la tabla de la sección 3. Si no hay precio publicado para la combinación (faros, otra consulta), el resumen dice "Te confirmamos el precio por WhatsApp."
- Regla: si el servicio es Lavado básico, deshabilita "A domicilio" y explica: "El servicio a domicilio aplica para Lavado premium y Full detailing."
- Botón primario "Enviar por WhatsApp". Texto de ayuda debajo: "Se abre WhatsApp con tu mensaje listo. No guardamos tus datos."
- El mensaje queda así: "Hola, quiero agendar un [servicio] para mi [vehículo], [lugar]. Fecha preferida: [fecha]. Nombre: [nombre]." Codifícalo con `encodeURIComponent` y omite las partes vacías.
- Validación: etiquetas visibles asociadas a cada campo, mensajes de error en texto que digan qué corregir ("Elegí un servicio para continuar."), nunca solo color. Sin modal.

## 6.7 Medios de pago (condicional)

El perfil tiene un destacado "Medio de pago" cuyo contenido no se pudo leer. Crea el componente, pero que solo se renderice si `paymentMethods` en la configuración tiene elementos. **No supongas** efectivo, SINPE Móvil ni tarjeta. **(confirmar)**

## 6.8 Clientes (condicional)

Igual que el punto anterior: componente listo y oculto mientras `testimonials` esté vacío. **Prohibido inventar testimonios, cifras de clientes, años de experiencia o certificaciones.** Si el cliente entrega fotos de carros atendidos con permiso, se integran en Trabajos.

## 6.9 Footer (oscuro)

Logo, la frase "Más que un lavado. Es cuidado.", navegación repetida, enlace a Instagram, WhatsApp y "© 2026 Woper Net Studio". Nada más.

## 6.10 Barra fija en móvil

En pantallas menores a 768 px, una barra inferior fija con el botón "Agendar por WhatsApp" y un botón de llamada. Se oculta cuando la sección de contacto es visible (IntersectionObserver) y respeta el área segura de iOS (`env(safe-area-inset-bottom)`). Que no tape el contenido: añade padding inferior al `main` en móvil.

# 7. Copy: reglas de redacción

- Escribe para quien contrata el servicio, con palabras simples. Describe qué es y qué incluye; no vendas con adjetivos.
- Verbos activos y botones que dicen lo que pasa: "Agendar por WhatsApp", "Reservar", "Ver servicios", "Enviar por WhatsApp". Una acción conserva el mismo nombre en todo el flujo.
- Sentence case. Sin signos de exclamación salvo que el flyer del cliente los use. Sin frases de relleno.
- Solo hechos del flyer o del perfil. Si falta un dato, no lo rellenes: ponlo en `docs/pendientes.md`.

# 8. Medios (imágenes, video, logo)

No tienes acceso a las fotos originales del cliente. Las miniaturas de Instagram son de baja resolución (alrededor de 640 px) y no sirven para un hero. Pide al cliente los archivos originales.

Estructura esperada:

```
public/media/
  logo/woper-net-emblema.svg      (o .png con fondo transparente, 1024 px)
  logo/woper-net-wordmark.svg
  hero/hero-espuma.mp4            (H.264, 1080p, 8 a 12 s, sin audio, máx. 4 MB)
  hero/hero-espuma.webm
  hero/hero-espuma-poster.jpg     (2400x1350, fotografía oscura, espuma sobre carro)
  trabajos/                       (6 a 8 archivos: 1600 px en el lado largo, jpg o webp;
                                   reels en mp4 vertical 1080x1920)
```

- Convierte las imágenes a AVIF y WebP con `srcset` y `sizes`. Todas con `width` y `height` explícitos para evitar saltos de diseño. `loading="lazy"` salvo el LCP.
- Mientras falten medios, usa un componente `MediaPlaceholder`: panel `--grafito` con una barra de brillo sutil y el texto del archivo esperado, visible solo en desarrollo.
- Crea `npm run check:media`, que liste los archivos faltantes y salga con error en producción.
- **No reproduzcas los flyers como imagen.** Reconstruye su contenido como HTML (mejor SEO, accesibilidad y mantenimiento).
- Antes de publicar, el cliente debe autorizar el uso de cada foto o video donde aparezcan placas, rostros o carros de otras personas. **(confirmar)** Si hay placas legibles, difumínalas.

# 9. Stack y estructura

- **Astro** (salida estática), TypeScript, CSS plano con variables (sin Tailwind, para controlar el sistema de tokens). JavaScript mínimo, vanilla, solo para: menú móvil, cabecera sticky, visor de galería, formulario de WhatsApp, barra fija móvil, control de pausa del video.
- Si Astro no es viable en el entorno, usa HTML, CSS y JS estáticos con la misma estructura.
- Todo el contenido editable vive en `src/data/site.ts`: negocio, contacto, horario, servicios, precios, domicilio, galería, `paymentMethods`, `testimonials`. El cliente (o tú) cambia un precio o un teléfono en un solo lugar.
- Estructura sugerida:

```
src/
  data/site.ts
  styles/tokens.css  base.css  components.css
  components/ Header Hero ServiceRow Domicilio Gallery ContactForm Footer MobileBar MediaPlaceholder
  layouts/Base.astro
  pages/index.astro
public/ media/ favicon, og-image, robots.txt
scripts/ check-contrast.mjs  check-media.mjs
docs/ design-plan.md  pendientes.md  README-cliente.md
```

- Despliegue: sitio estático listo para Cloudflare Pages o Netlify. Documenta el comando de build y el directorio de salida en el README.
- **Opcional, fase 2:** deja preparado (comentado y documentado) el envío del formulario a un webhook, por ejemplo de GoHighLevel, para que cada solicitud entre al CRM además de abrir WhatsApp. No lo actives sin pedirlo.

# 10. SEO y datos estructurados

- `<title>`: "Woper Net Studio | Lavado y detallado automotriz en Desamparados y a domicilio".
- Meta description (máx. 155 caracteres): "Lavado, lavado premium y full detailing con productos Meguiar's en Desamparados. Servicio a domicilio en San José y alrededores. Agendá por WhatsApp."
- Un solo `h1`. Jerarquía de encabezados sin saltos. Enlaces con texto descriptivo.
- Open Graph y Twitter Card con imagen de 1200×630 (generada a partir del hero cuando haya medios).
- Favicon e ícono táctil a partir del emblema de la llanta.
- JSON-LD tipo `AutoWash` (con `LocalBusiness`): nombre, teléfonos (+506 8964-7178 y +506 6482-2257), dirección (Calle Fallas, Desamparados, San José, CR, **confirmar**), `openingHoursSpecification` (sábado y domingo, 07:00 a 15:00), `areaServed` San José, `sameAs` con Instagram, y `hasOfferCatalog` con los tres servicios y sus precios en CRC. No incluyas coordenadas ni valoraciones que no tengas.
- `sitemap.xml` y `robots.txt`. Canonical absoluta al dominio final (variable de entorno `SITE_URL`).

# 11. Accesibilidad (WCAG 2.1 AA, obligatorio)

Verifica cada punto antes de dar el trabajo por terminado:

- Contraste: 4,5:1 en texto normal, 3:1 en texto grande y componentes de interfaz (bordes de campos, íconos, foco). Verifica el texto sobre el hero con el scrim.
- Todo es operable con teclado, con orden de foco lógico. Foco siempre visible (sección 5.3). Sin trampas de foco salvo el menú móvil y el visor, que se cierran con Escape y devuelven el foco.
- Imágenes significativas con `alt` descriptivo; decorativas con `alt=""`. Íconos SVG con `aria-hidden` cuando acompañan texto.
- Video: mudo por defecto, sin audio automático, con control de pausa visible.
- Formularios: `label` visibles ligados por `for`/`id`, agrupación con `fieldset` y `legend` en los radios, errores identificados en texto y anunciados con `aria-live="polite"`.
- Objetivos táctiles de al menos 44×44 px. Zoom al 200 % sin pérdida de contenido ni scroll horizontal.
- Respeta `prefers-reduced-motion`. Soporta `prefers-color-scheme` solo si no complica el sistema (el diseño ya es oscuro y claro por sección; no inviertas la paleta).
- Ejecuta axe-core contra la página (con Playwright) y corrige todo lo crítico y serio. Revisa también a mano con teclado.

# 12. Rendimiento

- Objetivos en Lighthouse móvil: Rendimiento 90 o más, Accesibilidad 95 o más (idealmente 100), SEO 95 o más, Mejores prácticas 95 o más. CLS menor a 0,05. LCP menor a 2,5 s en 4G simulado.
- Fuentes auto-hospedadas y subconjunto latino. Un solo archivo CSS crítico en línea si ayuda. Sin librerías de animación ni de UI. Sin scripts de terceros por defecto.
- Analítica opcional: Plausible (sin cookies, no requiere aviso de cookies), con eventos `whatsapp_click`, `call_click` y `form_submit`. Déjala desactivada hasta que el cliente la pida.

# 13. Qué evitar

- Fondo crema con serif y acento terracota; negro con acento verde ácido; maquetación de periódico con filetes y cero radios por defecto.
- Contenido troceado en tarjetas idénticas con el mismo radio y la misma sombra; degradados decorativos.
- Etiquetas en mayúsculas sobre cada título, numeración de adorno (01 / 02 / 03), cadenas con puntos medios, flechas añadidas a los botones, una palabra de titular resaltada.
- Animaciones en cada sección, parallax pesado, carruseles automáticos, chatbots, ventanas emergentes, avisos de cookies innecesarios.
- Fotos de stock, logos de otras marcas, estadísticas o testimonios inventados.
- Escribir en el CSS selectores de tipo (`.section`) y de elemento (`.cta`) que se cancelen entre sí con el padding o el margen. Define una escala de espaciado y úsala.

# 14. Proceso de trabajo (síguelo en este orden)

1. **Plan de diseño** (`docs/design-plan.md`, máximo una página): tokens de color, tipografía, concepto de layout con wireframes ASCII (hero, fila de servicio, domicilio, contacto) y principios. Luego **revísalo contra este brief**: si alguna parte se parece a lo que producirías para cualquier landing de servicios, cámbiala y anota qué cambiaste y por qué. Solo después empieza a programar.
2. **Andamiaje:** proyecto, tokens, `site.ts` con los datos de las secciones 2 y 3, tipografía y componentes base.
3. **Construcción por secciones**, de arriba abajo. Primero móvil (390 px), luego 768 y 1440.
4. **Autocrítica visual:** toma capturas con Playwright en 390, 768 y 1440 px de cada sección y compáralas con el brief. Aplica la regla de Chanel: antes de entregar, quita un accesorio (un adorno, un borde o un efecto que no aporte información).
5. **Verificación:** `check-contrast`, axe-core, Lighthouse móvil, navegación solo con teclado, zoom 200 %, `check:media`. Corrige y repite hasta cumplir los criterios.
6. **Entrega:** `docs/README-cliente.md` con cómo editar precios y teléfonos, cómo reemplazar fotos y cómo desplegar; `docs/pendientes.md` con la lista de la sección 15.

# 15. Pendientes para confirmar con el cliente

Registra esto en `docs/pendientes.md` y no bloquees el desarrollo por ello:

1. Lista completa de lo que incluyen el Lavado básico y el Lavado premium (los flyers salían recortados en la cuadrícula de Instagram).
2. Precios a domicilio: ¿son el total del servicio a domicilio para Premium y Full detailing, o un recargo? (hoy un sedán a domicilio cuesta lo mismo que el Full detailing en sede).
3. Medios de pago aceptados (destacado "Medio de pago" del perfil).
4. Clientes y testimonios autorizados (destacado "Clientes" del perfil) y permiso para publicar fotos de carros ajenos.
5. Contenido del destacado "Contacto" y si hay horario entre semana o para domicilio.
6. Dirección exacta y punto en el mapa de Calle Fallas, Desamparados.
7. Número de WhatsApp para el enlace con mensaje (se asume +506 8964-7178) y si el handle de Instagram de los flyers es otra cuenta.
8. Precio o rango de la restauración de faros y de otros trabajos sin precio publicado.
9. Archivos originales: logo en vector o PNG transparente, fotos, reels, video del hero.
10. Dominio final para canonical, Open Graph y sitemap.

# 16. Criterios de aceptación

- Se ve y se siente como una marca automotriz premium: hero cinematográfico, mucho aire, una sola apuesta visual (la luz sobre la carrocería) y todo lo demás sobrio.
- Los datos de contacto, precios y horarios coinciden exactamente con las secciones 2 y 3.
- El formulario abre WhatsApp con el mensaje correcto en móvil y escritorio, y el cálculo de precio coincide con la tabla.
- Cumple WCAG 2.1 AA y las metas de Lighthouse de la sección 12.
- Sin errores en consola, sin saltos de diseño, sin scroll horizontal en 320 px.
- Cambiar un precio o un teléfono toma un solo cambio en `src/data/site.ts`.
- Cuando termines, resume en pocas líneas lo construido, lo que quedó pendiente de confirmar y cómo desplegarlo.
