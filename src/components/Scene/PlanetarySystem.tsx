// src/components/Scene/PlanetarySystem.tsx

import type { PlanetarySystemConfig } from "@/types/scene.types";
import { OrbitRing } from "./OrbitRing";
import { Planet } from "./Planet";

interface PlanetarySystemProps {
  config: PlanetarySystemConfig;
}

export const PlanetarySystem: React.FC<PlanetarySystemProps> = ({ config }) => {
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
                opacity: 0.3,
                segments: 128,
              }}
            />
          )}
          <Planet config={planetConfig} />
        </group>
      ))}
    </>
  );
};
