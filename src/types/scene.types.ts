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

export interface CameraConfig {
  minDistance: number;
  maxDistance: number;
  minPolarAngle: number;
  maxPolarAngle: number;
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
  camera: CameraConfig;
  sun: SunConfig;
}
