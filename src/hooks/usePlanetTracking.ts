// src/hooks/usePlanetTracking.ts
// Tracks real-time planet positions for camera targeting and interactions

import type { PlanetConfig, PlanetPosition } from "@/types/scene.types";
import { useFrame } from "@react-three/fiber";
import { useCallback, useRef } from "react";
import * as THREE from "three";

export const usePlanetTracking = (planets: PlanetConfig[]) => {
  const timeRef = useRef(0);
  const positionsRef = useRef<Map<string, PlanetPosition>>(new Map());

  useFrame((_state, delta) => {
    timeRef.current += delta;

    planets.forEach((planet) => {
      const angle =
        planet.initialAngle + timeRef.current * planet.revolutionSpeed;
      const a = planet.orbitalRadius;
      const e = planet.eccentricity;
      const r = (a * (1 - e * e)) / (1 + e * Math.cos(angle));

      const x = r * Math.cos(angle);
      const z = r * Math.sin(angle);

      positionsRef.current.set(planet.name, {
        name: planet.name,
        position: new THREE.Vector3(x, 0, z),
        radius: planet.radius,
      });
    });
  });

  const getPlanetPosition = useCallback(
    (name: string): PlanetPosition | undefined => {
      return positionsRef.current.get(name);
    },
    []
  );

  return { getPlanetPosition };
};
