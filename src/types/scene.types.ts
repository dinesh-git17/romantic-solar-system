// src/types/scene.types.ts

export interface StarfieldConfig {
  count: number;
  radius: number;
  depth: number;
}

export interface LightingConfig {
  ambientIntensity: number;
  directionalIntensity: number;
  pointLightIntensity: number;
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

export interface HelperConfig {
  grid: {
    size: number;
    divisions: number;
    colorCenterLine: string;
    colorGrid: string;
  };
  axes: {
    size: number;
  };
}

export interface SunConfig {
  radius: number;
  emissiveIntensity: number;
  rotationSpeed: number;
  textureUrl?: string;
  glowStrength: number;
}

export interface SceneConfig {
  starfield: StarfieldConfig;
  lighting: LightingConfig;
  controls: ControlsConfig;
  helpers: HelperConfig;
  sun: SunConfig;
}
