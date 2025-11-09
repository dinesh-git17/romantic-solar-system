// src/store/cameraStore.ts
// Zustand store for camera animation state management

import * as THREE from "three";
import { create } from "zustand";

interface CameraState {
  selectedPlanet: string | null;
  isAnimating: boolean;
  defaultCameraPosition: THREE.Vector3;
  defaultCameraTarget: THREE.Vector3;
  selectPlanet: (name: string) => void;
  deselectPlanet: () => void;
  setAnimating: (animating: boolean) => void;
}

export const useCameraStore = create<CameraState>((set) => ({
  selectedPlanet: null,
  isAnimating: false,
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
}));
