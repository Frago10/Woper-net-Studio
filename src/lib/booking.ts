/*
  Lógica de precios y mensajes. Funciones puras: las usa la página, el
  formulario en el navegador y scripts/booking.test.mjs.
*/
import { site } from '../data/site.ts';
import type { PlaceId, ServiceId, VehicleId } from '../data/site.ts';

export interface Selection {
  service: ServiceId | '';
  vehicle: VehicleId | '';
  place: PlaceId | '';
  /** Fecha en formato AAAA-MM-DD (valor de un input type="date"). */
  date?: string;
  name?: string;
}

/** Formato único de precios: ₡5.000, ₡12.000. */
export function formatColones(amount: number): string {
  return `₡${String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsapp.international}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telUrl(international: string): string {
  return `tel:+${international}`;
}

export function mapsUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.location.mapsQuery)}`;
}

export const findService = (id: string) => site.services.find((s) => s.id === id);
export const findVehicle = (id: string) => site.vehicles.find((v) => v.id === id);
export const findPlace = (id: string) => site.places.find((p) => p.id === id);

/** Si el servicio se puede pedir a domicilio. */
export function allowsHomeService(serviceId: string): boolean {
  const service = findService(serviceId);
  // Sin precio publicado (faros, otra consulta) no se bloquea: se confirma por WhatsApp.
  return service ? service.homeService || service.price === null : true;
}

/**
  Precio de la combinación, o `null` si no hay precio publicado.
  - En sede: el precio del servicio.
  - A domicilio (premium y full): el precio según el tipo de vehículo.
*/
export function quote({ service, vehicle, place }: Selection): number | null {
  const s = findService(service);
  const v = findVehicle(vehicle);
  if (!s || !v || !place || s.price === null) return null;
  if (place === 'sede') return s.price;
  return s.homeService ? v.homePrice : null;
}

/** Fecha legible: "sábado 14 de noviembre". */
export function formatDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  if (!y || !m || !d) return '';
  return new Intl.DateTimeFormat(site.locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(y, m - 1, d));
}

/** Si la sede atiende ese día de la semana. */
export function isOpenAtShop(isoDate: string): boolean {
  const [y, m, d] = isoDate.split('-').map(Number);
  if (!y || !m || !d) return true;
  return site.hours.weekdays.includes(new Date(y, m - 1, d).getDay());
}

/** Resumen en vivo del formulario. Vacío si falta elegir algo. */
export function buildSummary(selection: Selection): string {
  const s = findService(selection.service);
  const v = findVehicle(selection.vehicle);
  const p = findPlace(selection.place);
  if (!s || !v || !p) return '';
  const base = `${s.name} para ${v.inSentence}, ${p.inSentence}`;
  const price = quote(selection);
  return price === null
    ? `${base}. Te confirmamos el precio por WhatsApp.`
    : `${base}: ${formatColones(price)}.`;
}

/** Mensaje de WhatsApp. Las partes vacías se omiten. */
export function buildMessage(selection: Selection): string {
  const s = findService(selection.service);
  const v = findVehicle(selection.vehicle);
  const p = findPlace(selection.place);
  if (!s) return site.generalMessage;

  let message = s.messageIntro;
  if (v) message += ` para mi ${v.inSentence}`;
  if (p) message += `, ${p.inSentence}`;
  message += '.';

  const date = selection.date ? formatDate(selection.date) : '';
  if (date) message += ` Fecha preferida: ${date}.`;
  const name = selection.name?.trim();
  if (name) message += ` Nombre: ${name}.`;
  return message;
}
