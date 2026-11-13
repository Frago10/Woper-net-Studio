/*
  Verifica el contraste (WCAG 2.1 AA) de todos los pares de color que usa la página.
  Lee los valores de src/styles/tokens.css. Falla si algún par no cumple.

    npm run check:contrast
*/
import fs from 'node:fs';
import path from 'node:path';

const css = fs.readFileSync(path.join(process.cwd(), 'src/styles/tokens.css'), 'utf8');

const token = (name) => {
  const match = css.match(new RegExp(`--${name}:\\s*([^;]+);`));
  if (!match) throw new Error(`No existe el token --${name} en tokens.css`);
  return match[1].trim();
};

const rgb = (hex) => {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};

const luminance = ([r, g, b]) => {
  const [R, G, B] = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/** Color `top` con opacidad `alpha` sobre `bottom`. */
const over = (top, alpha, bottom) => top.map((c, i) => Math.round(c * alpha + bottom[i] * (1 - alpha)));

const c = Object.fromEntries(
  [
    'asfalto',
    'grafito',
    'ceramica',
    'cromo',
    'acero',
    'borde-oscuro',
    'rojo',
    'rojo-hover',
    'blanco',
  ].map((name) => [name, rgb(token(name))]),
);

// Peor caso del hero: el scrim de asfalto sobre una zona blanca de la foto (espuma).
const white = [255, 255, 255];
const scrimTexto = over(c.asfalto, Number(token('scrim-texto')), white);
const scrimCabecera = over(c.asfalto, Number(token('scrim-cabecera')), white);

// Instante más brillante de la barra de luz (mezcla "screen" sobre el scrim).
const luz = Number(token('luz-pico'));
const lit = (color) => color.map((c) => Math.round(c + (255 - c) * luz));

const TEXT = 4.5;
const UI = 3;

const pairs = [
  // Texto sobre oscuro
  ['ceramica', c.ceramica, 'asfalto', c.asfalto, TEXT, 'Texto principal en secciones oscuras'],
  ['cromo', c.cromo, 'asfalto', c.asfalto, TEXT, 'Texto secundario en secciones oscuras'],
  ['ceramica', c.ceramica, 'grafito', c.grafito, TEXT, 'Texto en el panel del formulario'],
  ['cromo', c.cromo, 'grafito', c.grafito, TEXT, 'Texto de ayuda en el panel del formulario'],
  // Texto sobre claro
  ['asfalto', c.asfalto, 'ceramica', c.ceramica, TEXT, 'Texto principal en secciones claras'],
  ['acero', c.acero, 'ceramica', c.ceramica, TEXT, 'Texto secundario en secciones claras'],
  // Botón primario
  ['blanco', c.blanco, 'rojo', c.rojo, TEXT, 'Texto del botón primario'],
  ['blanco', c.blanco, 'rojo-hover', c['rojo-hover'], TEXT, 'Texto del botón primario en hover'],
  // Botón secundario en hover (colores invertidos)
  ['asfalto', c.asfalto, 'ceramica', c.ceramica, TEXT, 'Botón secundario en hover sobre oscuro'],
  ['ceramica', c.ceramica, 'asfalto', c.asfalto, TEXT, 'Botón secundario en hover sobre claro'],
  // Hero sobre fotografía (peor caso: foto blanca)
  ['ceramica', c.ceramica, 'scrim del texto sobre blanco', scrimTexto, TEXT, 'Titular, subtítulo y botones del hero'],
  ['ceramica', c.ceramica, 'scrim de la cabecera sobre blanco', scrimCabecera, TEXT, 'Navegación sobre el hero'],
  ['ceramica', c.ceramica, 'scrim del texto con la barra de luz encima', lit(scrimTexto), TEXT, 'Texto del hero mientras pasa la luz'],
  ['ceramica', c.ceramica, 'scrim de la cabecera con la barra de luz encima', lit(scrimCabecera), TEXT, 'Navegación mientras pasa la luz'],
  // Componentes de interfaz (3:1)
  ['borde-oscuro', c['borde-oscuro'], 'asfalto', c.asfalto, UI, 'Borde de controles sobre asfalto'],
  ['borde-oscuro', c['borde-oscuro'], 'grafito', c.grafito, UI, 'Borde de campos en el formulario'],
  ['acero', c.acero, 'ceramica', c.ceramica, UI, 'Borde de controles sobre claro'],
  ['ceramica', c.ceramica, 'asfalto', c.asfalto, UI, 'Íconos y borde del botón secundario sobre oscuro'],
  ['asfalto', c.asfalto, 'ceramica', c.ceramica, UI, 'Íconos y borde del botón secundario sobre claro'],
  ['blanco', c.blanco, 'asfalto', c.asfalto, UI, 'Foco sobre oscuro'],
  ['blanco', c.blanco, 'grafito', c.grafito, UI, 'Foco dentro del formulario'],
  ['asfalto', c.asfalto, 'ceramica', c.ceramica, UI, 'Foco sobre claro'],
  ['rojo', c.rojo, 'asfalto', c.asfalto, UI, 'Pinza del emblema y líneas de énfasis (no texto)'],
  ['rojo', c.rojo, 'grafito', c.grafito, UI, 'Marca de error en el formulario (acompaña al texto)'],
];

let failed = 0;
console.log('Contraste WCAG 2.1 AA\n');
for (const [fgName, fg, bgName, bg, min, use] of pairs) {
  const value = ratio(fg, bg);
  const ok = value >= min;
  if (!ok) failed += 1;
  console.log(
    `${ok ? 'OK   ' : 'FALLA'}  ${value.toFixed(2).padStart(5)}:1  (mín. ${min}:1)  ${fgName} sobre ${bgName}. ${use}`,
  );
}

console.log(
  '\nNo se evalúan: --linea-oscura y --linea-clara (filetes decorativos entre filas, sin información propia).',
);

if (failed) {
  console.error(`\n${failed} par(es) no cumplen. Ajustá el token y volvé a correr.`);
  process.exit(1);
}
console.log(`\n${pairs.length} pares cumplen.`);
