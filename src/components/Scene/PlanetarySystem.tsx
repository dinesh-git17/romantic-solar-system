// src/components/Scene/PlanetarySystem.tsx
// Manages all planets, asteroid belt, comet, and Saturn particle effects

import type { PlanetarySystemConfig } from "@/types/scene.types";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { AsteroidBelt } from "./AsteroidBelt";
import { Comet } from "./Comet";
import { OrbitRing } from "./OrbitRing";
import { Planet } from "./Planet";
import { SaturnParticles } from "./SaturnParticles";

interface PlanetarySystemProps {
  config: PlanetarySystemConfig;
}

export const PlanetarySystem: React.FC<PlanetarySystemProps> = ({ config }) => {
  const saturnPositionRef = useRef(new THREE.Vector3(0, 0, 0));
  const timeRef = useRef(0);

  useFrame((_state, delta) => {
    timeRef.current += delta;

    const saturnConfig = config.planets.find((p) => p.name === "Saturn");
    if (saturnConfig) {
      const angle =
        saturnConfig.initialAngle +
        timeRef.current * saturnConfig.revolutionSpeed;
      const a = saturnConfig.orbitalRadius;
      const e = saturnConfig.eccentricity;
      const r = (a * (1 - e * e)) / (1 + e * Math.cos(angle));

      saturnPositionRef.current.set(
        r * Math.cos(angle),
        0,
        r * Math.sin(angle)
      );
    }
  });

  const orbitOpacity = config.orbitOpacity ?? 0.3;

  return (
    <>
      {config.planets.map((planetConfig) => (
        <group key={planetConfig.name}>
          {config.showOrbits && (
            <OrbitRing
              config={{
                orbitalRadius: planetConfig.orbitalRadius,
                eccentricity: planetConfig.eccentricity,
                color: planetConfig.color,
                opacity: orbitOpacity,
                segments: 128,
              }}
            />
          )}
          <Planet config={planetConfig} />
        </group>
      ))}
      {config.asteroidBelt && <AsteroidBelt config={config.asteroidBelt} />}
      {config.comet && config.comet.enabled && <Comet config={config.comet} />}
      {config.saturnParticles && config.saturnParticles.enabled && (
        <SaturnParticles
          config={config.saturnParticles}
          saturnPosition={saturnPositionRef.current}
        />
      )}
    </>
  );
};
