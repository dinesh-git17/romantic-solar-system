// src/store/appStore.ts

import type { AppMode } from "@/types/app.types";
import { create } from "zustand";

interface AppStore {
  showLanding: boolean;
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  hideLanding: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  showLanding: true,
  mode: "educational",

  setMode: (mode: AppMode) => {
    set({ mode });
  },

  hideLanding: () => {
    set({ showLanding: false });
  },
}));
