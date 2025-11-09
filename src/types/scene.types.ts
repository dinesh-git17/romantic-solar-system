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
}

export interface OrbitRingConfig {
  orbitalRadius: number;
  eccentricity: number;
  color: string;
  opacity: number;
  segments: number;
}

export interface PlanetarySystemConfig {
  planets: PlanetConfig[];
  showOrbits: boolean;
}

export interface SceneConfig {
  starfield: StarfieldConfig;
  lighting: LightingConfig;
  controls: ControlsConfig;
  helpers: HelperConfig;
  sun: SunConfig;
  planetarySystem: PlanetarySystemConfig;
}
