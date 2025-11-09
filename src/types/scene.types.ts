// src/types/scene.types.ts
// Type definitions for the 3D solar system scene configuration

import type * as THREE from "three";

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

export interface PlanetConfig {
  name: string;
  radius: number;
  orbitalRadius: number;
  eccentricity: number;
  axialTilt: number;
  rotationSpeed: number;
  revolutionSpeed: number;
  initialAngle: number;
  textureUrl?: string;
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
  hasAtmosphere?: boolean;
  hasRings?: boolean;
  ringInnerRadius?: number;
  ringOuterRadius?: number;
  ringTextureUrl?: string;
  hasCloudLayer?: boolean;
  cloudTextureUrl?: string;
  cloudRotationSpeed?: number;
  cloudOpacity?: number;
}

export interface OrbitRingConfig {
  orbitalRadius: number;
  eccentricity: number;
  color: string;
  opacity: number;
  segments: number;
}

export interface AsteroidBeltConfig {
  innerRadius: number;
  outerRadius: number;
  count: number;
  minSize: number;
  maxSize: number;
  verticalSpread: number;
  colors: string[];
  revolutionSpeed: number;
}

export interface CometConfig {
  enabled: boolean;
  orbitalRadius: number;
  eccentricity: number;
  revolutionSpeed: number;
  initialAngle: number;
  nucleusRadius: number;
  nucleusColor: string;
  nucleusEmissive: string;
  nucleusEmissiveIntensity: number;
  tailParticleCount: number;
  tailLength: number;
  tailColor: string;
}

export interface SaturnParticlesConfig {
  enabled: boolean;
  count: number;
  minRadius: number;
  maxRadius: number;
  colors: string[];
  particleSize: number;
}

export interface PlanetarySystemConfig {
  planets: PlanetConfig[];
  showOrbits: boolean;
  orbitOpacity?: number;
  asteroidBelt?: AsteroidBeltConfig;
  comet?: CometConfig;
  saturnParticles?: SaturnParticlesConfig;
}

export interface SceneConfig {
  starfield: StarfieldConfig;
  lighting: LightingConfig;
  controls: ControlsConfig;
  helpers: HelperConfig;
  sun: SunConfig;
  planetarySystem: PlanetarySystemConfig;
}

export interface CameraAnimationState {
  selectedPlanet: string | null;
  isAnimating: boolean;
  defaultCameraPosition: THREE.Vector3;
  defaultCameraTarget: THREE.Vector3;
}

export interface PlanetPosition {
  name: string;
  position: THREE.Vector3;
  radius: number;
}

export interface CameraTransitionConfig {
  duration: number;
  easing: (t: number) => number;
}
