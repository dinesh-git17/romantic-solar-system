// src/components/Scene/Lighting.tsx
import type { LightingConfig } from "@/types/scene.types";
import { memo } from "react";

interface LightingProps {
  config: LightingConfig;
}

export const Lighting = memo<LightingProps>(({ config }) => {
  return (
    <>
      <ambientLight
        intensity={config.ambient.intensity}
        color={config.ambient.color}
      />
      <directionalLight
        intensity={config.directional.intensity}
        position={config.directional.position}
        color={config.directional.color}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={500}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
      <pointLight
        position={[0, 0, 0]}
        intensity={0.5}
        color="#ffffff"
        distance={300}
        decay={2}
      />
    </>
  );
});
