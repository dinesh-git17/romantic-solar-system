// src/types/scene.types.ts
import type * as THREE from "three";

export interface CameraConfig {
  position: [number, number, number];
  fov: number;
  near: number;
  far: number;
}

export interface ControlsConfig {
  enableDamping: boolean;
  dampingFactor: number;
  minDistance: number;
  maxDistance: number;
  minPolarAngle: number;
  maxPolarAngle: number;
  enablePan: boolean;
  panSpeed: number;
  rotateSpeed: number;
  zoomSpeed: number;
  autoRotate: boolean;
  autoRotateSpeed: number;
}

export interface LightingConfig {
  ambient: {
    intensity: number;
    color: THREE.ColorRepresentation;
  };
  directional: {
    intensity: number;
    position: [number, number, number];
    color: THREE.ColorRepresentation;
  };
}

export interface StarfieldConfig {
  count: number;
  radius: number;
  depth: number;
  size: number;
  color: THREE.ColorRepresentation;
}

export interface SceneConfig {
  camera: CameraConfig;
  controls: ControlsConfig;
  lighting: LightingConfig;
  starfield: StarfieldConfig;
  showHelpers: boolean;
}

export interface HelperConfig {
  grid: {
    size: number;
    divisions: number;
    colorCenterLine: THREE.ColorRepresentation;
    colorGrid: THREE.ColorRepresentation;
  };
  axes: {
    size: number;
  };
}
