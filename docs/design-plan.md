# Plan de diseño: Woper Net Studio

Referencia completa: `BRIEF.md`. Este documento resume las decisiones antes de programar.

## Tokens

| Grupo | Valores |
|---|---|
| Color | `--asfalto #0E1012`, `--grafito #1A1D21`, `--ceramica #F2F3F4`, `--cromo #A9AFB6`, `--acero #5B626A`, `--borde-oscuro #7B828A`, `--rojo #D4141C`, `--rojo-hover #B50F16` |
| Añadidos | `--blanco #FFFFFF` (texto sobre rojo y foco), `--linea-oscura #2E3338` y `--linea-clara #D3D6D9` (filetes de 1 px que separan filas), `--scrim-texto 0.86` (opacidad mínima del scrim detrás del texto del hero) |
| Tipografía | Archivo variable. Titulares: ancho 120, peso 300, -0,02 em. Cuerpo: ancho 100, peso 400. Precios: ancho 125, peso 500, cifras tabulares |
| Escala | display `clamp(3rem, 2rem + 4.4vw, 6.5rem)`, h2 `clamp(2.25rem, 4.5vw, 4rem)`, h3 `clamp(1.5rem, 2vw, 2rem)`, cuerpo 1,0625 rem, pequeño 0,9375 rem |
| Espacio | 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160. Sección `clamp(96px, 12vw, 200px)`. Margen `clamp(20px, 5vw, 80px)`. 12 columnas, 1440 px |
| Forma | Fotos y video a 0 px. Controles a 4 px. Botón de 56 px. Foco de 3 px con desfase de 3 px |
| Movimiento | Un solo momento al cargar: titular por líneas (700 ms) y barra de luz (1,6 s, una vez). El resto, 150 ms y solo como respuesta a una acción |

## Layout

```
HERO (oscuro, 100 svh)                      FILA DE SERVICIO (claro)
+--------------------------------------+    +--------------------------------------+
| logo        nav            [Agendar] |    | Lavado premium | ✓ Lavado ext. | ₡8.000 |
|   foto o video a sangre              |    | Una frase.     | ✓ Aspirado    | [Reservar]
|                    (barra de luz →)  |    |                | ✓ Vidrios     |        |
| Más que un lavado.                   |    |--------------------------------------|
| Es cuidado.                          |    |▓ Full detailing ▓ ✓ ... ✓ ... ▓ ₡12.000 ▓| banda asfalto
| Subtítulo                            |    +--------------------------------------+
| [Agendar por WhatsApp] [Ver serv.]   |
|--------------------------------------|    CONTACTO (oscuro)
| Horario     | Ubicación  | Domicilio |    +------------------+-------------------+
+--------------------------------------+    | WhatsApp  8964…  | Servicio [   v ]  |
                                            | Teléfono  6482…  | Vehículo ( )( )( )|
A DOMICILIO (oscuro)                        | Instagram @wop…  | Dónde    ( )( )   |
+------------------+-------------------+    | Dirección …      | Fecha  Nombre     |
| Cómo funciona    | ⌐▭ Sedán  ₡12.000 |    | Horario …        | Resumen en vivo   |
| 1 Escribinos…    | ⌐▭ SUV    ₡15.000 |    | [Abrir en Maps]  | [Enviar por WA]   |
| 2 Coordinamos…   | ⌐▭ Pick up₡18.000 |    +------------------+-------------------+
| 3 Vamos…         | Nota de cobertura |
| 4 Realizamos…    | [Agendar a dom.]  |
+------------------+-------------------+
```

## Principios

1. La audacia se gasta en el hero. Todo lo demás es quieto.
2. El rojo es una señal: botón primario y pinza del emblema. Nunca texto pequeño sobre oscuro.
3. La oferta es una gama de modelos: filas con filete, no tarjetas.
4. Solo hechos del flyer. Lo que falta va a `docs/pendientes.md`, no a la página.
5. Todo a la izquierda, en sentence case, sin adornos sobre los títulos.

## Revisión contra el brief: qué cambié y por qué

| Primera idea (genérica) | Lo que se construye | Motivo |
|---|---|---|
| Tres tarjetas de precio con una marcada "más popular" | Filas de ancho completo; el Full detailing se distingue invirtiendo el panel a asfalto, sin insignia | "Más popular" sería un dato inventado. La inversión marca el insignia sin decorar |
| Tres tarjetas con ícono para horario, ubicación y domicilio | Franja de datos tipo ficha técnica en la base del hero, sobre asfalto sólido | Evita la fila de "features" de cualquier landing y garantiza contraste sin depender de la foto |
| Scrim como degradado a porcentaje de la altura | Scrim anclado al bloque de texto, con opacidad mínima fija | El texto mide distinto en cada pantalla; así el 4,5:1 se cumple aunque la foto sea espuma blanca |
| Precios por vehículo en tres tarjetas con ícono grande | Tres líneas tipográficas con el precio como dato principal y un ícono de línea pequeño | El precio es la información; el ícono solo ayuda a reconocer el tipo |
| Tres botones rojos "Reservar" en la gama | Rojo solo en el insignia; básico y premium con botón de contorno | Mantiene el rojo como señal y le da jerarquía a la gama |
| Barra móvil visible desde el inicio | Aparece cuando el hero sale de pantalla y se oculta en contacto y footer | En el hero duplicaba la acción y tapaba la franja de datos |
| Botón "Agendar" también en la cabecera móvil | En móvil la cabecera lleva solo marca y menú | A 320 px no caben; la barra fija ya ofrece la acción |
| Cuadrícula de galería uniforme | Dos filas con anchos 5-3-4 y 3-4-5 y proporciones 4:5 y 9:16 | Los reels verticales y las fotos conviven sin recortes forzados |

## Regla de Chanel

Lo que se quitó antes de entregar está anotado al final de `docs/pendientes.md`.
