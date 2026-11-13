/*
  Todo el contenido editable de la página vive en este archivo.
  Cambiar un precio, un teléfono o un horario es un solo cambio aquí.

  Reglas:
  - Los precios son enteros en colones, sin puntos ni comas (5000, no "5.000").
  - Solo datos confirmados por el negocio. Lo pendiente está en docs/pendientes.md.
  - Este archivo no importa nada: también lo leen los scripts de verificación.
*/

export type ServiceId = 'basico' | 'premium' | 'full' | 'faros' | 'otra';
export type VehicleId = 'sedan' | 'suv' | 'pickup';
export type PlaceId = 'sede' | 'domicilio';

export interface Service {
  id: ServiceId;
  /** Nombre visible en la página y en el formulario. */
  name: string;
  /** Inicio del mensaje de WhatsApp para este servicio. */
  messageIntro: string;
  /** Precio en sede, en colones. `null` si no hay precio publicado. */
  price: number | null;
  /** Si se ofrece a domicilio con el precio por tipo de vehículo. */
  homeService: boolean;
  /** Las filas de la sección "Servicios y precios". */
  range?: {
    description: string;
    includes: string[];
    note?: string;
    flagship?: boolean;
  };
}

export interface Vehicle {
  id: VehicleId;
  name: string;
  /** Como se escribe dentro de una frase: "para mi sedán". */
  inSentence: string;
  /** Precio del servicio a domicilio, en colones. */
  homePrice: number;
}

export interface Place {
  id: PlaceId;
  name: string;
  /** Como se escribe dentro de una frase: "a domicilio". */
  inSentence: string;
}

export interface GalleryItem {
  /** Ruta dentro de public/media/. */
  file: string;
  kind: 'foto' | 'reel';
  /** Solo reels: imagen de portada opcional, dentro de public/media/. */
  poster?: string;
  /** Texto alternativo: describe lo que se ve. */
  alt: string;
  /** Pie visible bajo la imagen. */
  caption: string;
}

export interface PaymentMethod {
  name: string;
  detail?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  vehicle?: string;
}

export const site = {
  name: 'Woper Net Studio',
  shortName: 'Woper Net',
  tagline: 'Al cuidado automotriz',
  brandPhrase: ['Más que un lavado.', 'Es cuidado.'],
  locale: 'es-CR',

  nav: [
    { href: '#servicios', label: 'Servicios' },
    { href: '#domicilio', label: 'A domicilio' },
    { href: '#trabajos', label: 'Trabajos' },
    { href: '#contacto', label: 'Contacto' },
  ],

  seo: {
    title: 'Woper Net Studio | Lavado y detallado automotriz en Desamparados y a domicilio',
    description:
      "Lavado, lavado premium y full detailing con productos Meguiar's en Desamparados. Servicio a domicilio en San José y alrededores. Agendá por WhatsApp.",
  },

  hero: {
    subtitle:
      'Lavado y detallado automotriz en Desamparados. También vamos a tu casa en San José y alrededores.',
    /** Foto horizontal (pantallas anchas) y, opcional, un recorte vertical para móvil. */
    poster: 'hero/hero-espuma-poster.jpg',
    posterMobile: 'hero/hero-espuma-poster-movil.jpg',
    posterAlt: 'Carro oscuro cubierto de espuma durante un lavado en Woper Net Studio',
    videos: ['hero/hero-espuma.webm', 'hero/hero-espuma.mp4'],
  },

  contact: {
    whatsapp: {
      display: '8964-7178',
      /** Código de país + número, solo dígitos. Se usa en wa.me. */
      international: '50689647178',
      schema: '+506 8964-7178',
    },
    phone: {
      display: '6482-2257',
      international: '50664822257',
      schema: '+506 6482-2257',
    },
    instagram: {
      handle: '@wopernet',
      url: 'https://www.instagram.com/wopernet',
    },
    /** Enlace de la bio de Instagram. Queda como respaldo en el footer. */
    whatsappQrUrl: 'https://wa.me/qr/STUI7NYWKGGGH1',
  },

  location: {
    street: 'Calle Fallas',
    district: 'Desamparados',
    province: 'San José',
    countryCode: 'CR',
    mapsQuery: 'Calle Fallas, Desamparados, San José, Costa Rica',
  },

  hours: {
    days: 'Sábados y domingos',
    time: '7:00 a. m. a 3:00 p. m.',
    /** Para el aviso del formulario: 0 es domingo y 6 es sábado. */
    weekdays: [6, 0],
    schema: { days: ['Saturday', 'Sunday'], opens: '07:00', closes: '15:00' },
  },

  services: [
    {
      id: 'basico',
      name: 'Lavado básico',
      messageIntro: 'Hola, quiero agendar un lavado básico',
      price: 5000,
      homeService: false,
      range: {
        description: 'Lo esencial para un carro limpio por dentro y por fuera.',
        includes: ['Lavado exterior', 'Aspirado interior'],
      },
    },
    {
      id: 'premium',
      name: 'Lavado premium',
      messageIntro: 'Hola, quiero agendar un lavado premium',
      price: 8000,
      homeService: true,
      range: {
        description: 'Limpieza completa con vidrios impecables y encerado.',
        includes: ['Lavado exterior', 'Aspirado interior', 'Limpieza de vidrios', 'Encerado'],
      },
    },
    {
      id: 'full',
      name: "Full detailing con Meguiar's",
      messageIntro: "Hola, quiero agendar un full detailing con Meguiar's",
      price: 12000,
      homeService: true,
      range: {
        description: "Cuidado profundo con productos Meguiar's, de la pintura al parabrisas.",
        includes: [
          'Limpieza profunda',
          'Lavado exterior',
          'Aspirado interior',
          'Limpieza de vidrios',
          'Encerado',
          'Impermeabilización de parabrisas',
          'Protección de partes negras',
        ],
        note: "Uso exclusivo de productos Meguiar's.",
        flagship: true,
      },
    },
    {
      id: 'faros',
      name: 'Restauración de faros',
      messageIntro: 'Hola, quiero agendar una restauración de faros',
      price: null,
      homeService: false,
    },
    {
      id: 'otra',
      name: 'Otra consulta',
      messageIntro: 'Hola, tengo una consulta',
      price: null,
      homeService: false,
    },
  ] satisfies Service[] as Service[],

  /** Trabajos sin precio publicado. Se muestran al cierre de Servicios. */
  extras: {
    text: 'También restauramos faros con polímero y cuidamos llantas y rines.',
    linkLabel: 'Consultá por WhatsApp',
    message: 'Hola, quiero consultar por la restauración de faros y el cuidado de llantas y rines.',
  },

  homeService: {
    coverage: 'San José y alrededores',
    steps: [
      'Escribinos por WhatsApp.',
      'Coordinamos tu cita.',
      'Vamos hasta tu domicilio.',
      'Realizamos el servicio en la comodidad de tu hogar.',
    ],
    note: 'Aplica para Lavado premium y Full detailing. Cobertura en San José y alrededores.',
    basicNotice: 'El servicio a domicilio aplica para Lavado premium y Full detailing.',
  },

  vehicles: [
    { id: 'sedan', name: 'Sedán', inSentence: 'sedán', homePrice: 12000 },
    { id: 'suv', name: 'SUV', inSentence: 'SUV', homePrice: 15000 },
    { id: 'pickup', name: 'Pick up', inSentence: 'pick up', homePrice: 18000 },
  ] satisfies Vehicle[] as Vehicle[],

  places: [
    { id: 'sede', name: 'En Desamparados', inSentence: 'en Desamparados' },
    { id: 'domicilio', name: 'A domicilio', inSentence: 'a domicilio' },
  ] satisfies Place[] as Place[],

  /** Mensaje de los botones "Agendar por WhatsApp". */
  generalMessage: 'Hola, quiero agendar un servicio en Woper Net Studio.',

  /*
    Galería de "Trabajos recientes". Mientras el archivo no exista en
    public/media/, se muestra un panel vacío en su lugar.
  */
  gallery: [
    {
      file: 'trabajos/01-lavado-espuma.jpg',
      kind: 'foto',
      alt: 'Sedán azul oscuro cubierto de espuma durante el lavado exterior',
      caption: 'Lavado de espuma',
    },
    {
      file: 'trabajos/02-despues-del-lavado.jpg',
      kind: 'foto',
      alt: 'SUV gris limpio y brillante, con rines negros, después del lavado',
      caption: 'Después del lavado',
    },
    {
      file: 'trabajos/03-secado-a-mano.jpg',
      kind: 'foto',
      alt: 'Pick up gris mientras se seca a mano con una toalla de microfibra',
      caption: 'Secado a mano',
    },
    /*
      Para sumar un reel (video vertical), copiá el .mp4 y su portada .jpg en
      public/media/trabajos/ y agregá un elemento así:

      {
        file: 'trabajos/04-restauracion-faros.mp4',
        kind: 'reel',
        poster: 'trabajos/04-restauracion-faros.jpg',
        alt: 'Video de un faro opaco que queda transparente tras la restauración con polímero',
        caption: 'Restauración de faros con polímero',
      },
    */
  ] satisfies GalleryItem[] as GalleryItem[],

  /* Vacío hasta que el negocio confirme. Con elementos, la sección aparece sola. */
  paymentMethods: [] as PaymentMethod[],
  testimonials: [] as Testimonial[],

  /* Analítica sin cookies. Vacío = desactivada. Ej.: 'wopernet.com' */
  analytics: {
    plausibleDomain: '',
  },
};

export type Site = typeof site;
