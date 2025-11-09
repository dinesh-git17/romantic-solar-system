// src/store/cameraStore.ts
// Camera and UI mode state management

import * as THREE from "three";
import { create } from "zustand";

export type ViewMode = "educational" | "romantic";

interface CameraState {
  selectedPlanet: string | null;
  isAnimating: boolean;
  viewMode: ViewMode;
  defaultCameraPosition: THREE.Vector3;
  defaultCameraTarget: THREE.Vector3;
  selectPlanet: (name: string) => void;
  deselectPlanet: () => void;
  setAnimating: (animating: boolean) => void;
  setViewMode: (mode: ViewMode) => void;
}

export const useCameraStore = create<CameraState>((set) => ({
  selectedPlanet: null,
  isAnimating: false,
  viewMode: "educational",
  defaultCameraPosition: new THREE.Vector3(0, 50, 100),
  defaultCameraTarget: new THREE.Vector3(0, 0, 0),

  selectPlanet: (name: string) => {
    set({ selectedPlanet: name });
  },

  deselectPlanet: () => {
    set({ selectedPlanet: null });
  },

  setAnimating: (animating: boolean) => {
    set({ isAnimating: animating });
  },

  setViewMode: (mode: ViewMode) => {
    set({ viewMode: mode });
  },
}));
