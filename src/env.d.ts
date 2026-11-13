/// <reference types="astro/client" />

interface Window {
  /** Plausible Analytics. Solo existe si la analítica está activada. */
  plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
}

interface ImportMetaEnv {
  /** Fase 2: webhook del CRM para el formulario. Sin definir = desactivado. */
  readonly PUBLIC_FORM_WEBHOOK_URL?: string;
}
