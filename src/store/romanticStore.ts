// src/store/romanticStore.ts
// State management for romantic mode features and opening sequence

import { create } from "zustand";

interface RomanticStore {
  hasSeenRomanticOpening: boolean;
  setRomanticOpeningSeen: () => void;
  resetRomanticOpening: () => void;
}

export const useRomanticStore = create<RomanticStore>((set) => ({
  hasSeenRomanticOpening: false,

  setRomanticOpeningSeen: () => {
    set({ hasSeenRomanticOpening: true });
  },

  resetRomanticOpening: () => {
    set({ hasSeenRomanticOpening: false });
  },
}));
