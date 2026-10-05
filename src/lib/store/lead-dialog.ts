"use client";

import { create } from "zustand";

export interface LeadForm {
  name: string;
  email: string;
  company: string;
  message: string;
  /** Honeypot antispam. */
  website: string;
}

const EMPTY_FORM: LeadForm = {
  name: "",
  email: "",
  company: "",
  message: "",
  website: "",
};

/**
 * Estado global del dialog de contacto ("Hablemos de tu proyecto"):
 * visibilidad + campos del formulario (viven acá para que el prefill por
 * tema no requiera efectos) + origen del lead para analytics.
 */
interface LeadDialogState {
  open: boolean;
  source: string | null;
  topic: string | null;
  form: LeadForm;
  setField: (key: keyof LeadForm, value: string) => void;
  openDialog: (source?: string, topic?: string, message?: string) => void;
  closeDialog: () => void;
}

export const useLeadDialog = create<LeadDialogState>((set) => ({
  open: false,
  source: null,
  topic: null,
  form: EMPTY_FORM,
  setField: (key, value) =>
    set((s) => ({ form: { ...s.form, [key]: value } })),
  openDialog: (source = "generic", topic?: string, message?: string) =>
    set({
      open: true,
      source,
      topic: topic ?? null,
      // Formulario fresco en cada apertura; si viene un tema (ej.: tarjeta
      // de servicio) el mensaje arranca encaminado. `message` permite un
      // prefill más rico (ej.: armador de sistema con la lista de módulos).
      form: {
        ...EMPTY_FORM,
        message: message ?? (topic ? `Hello, I would like to discuss «${topic}». ` : ""),
      },
    }),
  closeDialog: () => set({ open: false }),
}));
