// src/types/planet-info.types.ts
// Type definitions for planet information panel system

export interface PlanetFact {
  icon: string;
  label: string;
  value: string;
}

export interface PlanetInfo {
  name: string;
  type: string;
  colorTheme: {
    text: string;
    border: string;
    glow: string;
  };
  facts: PlanetFact[];
  romanticMessage?: string;
}

export type PlanetName =
  | "Mercury"
  | "Venus"
  | "Earth"
  | "Mars"
  | "Jupiter"
  | "Saturn"
  | "Uranus"
  | "Neptune";

export type PlanetInfoData = Record<PlanetName, PlanetInfo>;
