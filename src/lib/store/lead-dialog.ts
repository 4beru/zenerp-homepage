"use client";

import { create } from "zustand";

/**
 * Estado global del dialog de contacto ("Hablemos de tu proyecto").
 * Lo abren el header, los CTAs del hero y el footer.
 */
interface LeadDialogState {
  open: boolean;
  source: string | null;
  openDialog: (source?: string) => void;
  closeDialog: () => void;
}

export const useLeadDialog = create<LeadDialogState>((set) => ({
  open: false,
  source: null,
  openDialog: (source = "generic") => set({ open: true, source }),
  closeDialog: () => set({ open: false }),
}));
