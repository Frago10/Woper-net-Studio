/*
  Comprueba que los precios y mensajes del formulario coinciden con la tabla
  de servicios del negocio.

    npm test
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  allowsHomeService,
  buildMessage,
  buildSummary,
  formatColones,
  isOpenAtShop,
  quote,
  whatsappUrl,
} from '../src/lib/booking.ts';

test('formato único de precios', () => {
  assert.equal(formatColones(5000), '₡5.000');
  assert.equal(formatColones(12000), '₡12.000');
  assert.equal(formatColones(800), '₡800');
  assert.equal(formatColones(1250000), '₡1.250.000');
});

test('precios en sede: el precio del servicio, sin importar el vehículo', () => {
  for (const vehicle of ['sedan', 'suv', 'pickup']) {
    assert.equal(quote({ service: 'basico', vehicle, place: 'sede' }), 5000);
    assert.equal(quote({ service: 'premium', vehicle, place: 'sede' }), 8000);
    assert.equal(quote({ service: 'full', vehicle, place: 'sede' }), 12000);
  }
});

test('precios a domicilio: según el tipo de vehículo, para premium y full', () => {
  for (const service of ['premium', 'full']) {
    assert.equal(quote({ service, vehicle: 'sedan', place: 'domicilio' }), 12000);
    assert.equal(quote({ service, vehicle: 'suv', place: 'domicilio' }), 15000);
    assert.equal(quote({ service, vehicle: 'pickup', place: 'domicilio' }), 18000);
  }
});

test('sin precio publicado no se inventa uno', () => {
  assert.equal(quote({ service: 'basico', vehicle: 'sedan', place: 'domicilio' }), null);
  assert.equal(quote({ service: 'faros', vehicle: 'sedan', place: 'sede' }), null);
  assert.equal(quote({ service: 'otra', vehicle: 'suv', place: 'domicilio' }), null);
  assert.equal(quote({ service: 'premium', vehicle: '', place: 'sede' }), null);
});

test('el lavado básico no se ofrece a domicilio', () => {
  assert.equal(allowsHomeService('basico'), false);
  assert.equal(allowsHomeService('premium'), true);
  assert.equal(allowsHomeService('full'), true);
  assert.equal(allowsHomeService('faros'), true);
});

test('resumen en vivo', () => {
  assert.equal(
    buildSummary({ service: 'premium', vehicle: 'sedan', place: 'domicilio' }),
    'Lavado premium para sedán, a domicilio: ₡12.000.',
  );
  assert.equal(
    buildSummary({ service: 'basico', vehicle: 'suv', place: 'sede' }),
    'Lavado básico para SUV, en Desamparados: ₡5.000.',
  );
  assert.equal(
    buildSummary({ service: 'faros', vehicle: 'pickup', place: 'sede' }),
    'Restauración de faros para pick up, en Desamparados. Te confirmamos el precio por WhatsApp.',
  );
  assert.equal(buildSummary({ service: 'premium', vehicle: '', place: 'sede' }), '');
});

test('mensaje de WhatsApp: omite las partes vacías', () => {
  assert.equal(
    buildMessage({ service: 'full', vehicle: 'suv', place: 'domicilio' }),
    "Hola, quiero agendar un full detailing con Meguiar's para mi SUV, a domicilio.",
  );
  assert.equal(
    buildMessage({
      service: 'premium',
      vehicle: 'sedan',
      place: 'sede',
      date: '2026-11-14',
      name: '  Ana  ',
    }),
    'Hola, quiero agendar un lavado premium para mi sedán, en Desamparados. Fecha preferida: sábado, 14 de noviembre. Nombre: Ana.',
  );
  assert.equal(
    buildMessage({ service: 'faros', vehicle: 'sedan', place: 'sede' }),
    'Hola, quiero agendar una restauración de faros para mi sedán, en Desamparados.',
  );
});

test('enlace de WhatsApp codificado', () => {
  assert.equal(whatsappUrl(), 'https://wa.me/50689647178');
  assert.equal(
    whatsappUrl('Hola, ¿tienen campo?'),
    'https://wa.me/50689647178?text=Hola%2C%20%C2%BFtienen%20campo%3F',
  );
});

test('la sede atiende sábados y domingos', () => {
  assert.equal(isOpenAtShop('2026-11-14'), true); // sábado
  assert.equal(isOpenAtShop('2026-11-15'), true); // domingo
  assert.equal(isOpenAtShop('2026-11-16'), false); // lunes
});
