// src/components/Scene/Lighting.tsx

import type { LightingConfig } from "@/types/scene.types";

interface LightingProps {
  config: LightingConfig;
}

export const Lighting: React.FC<LightingProps> = ({ config }) => {
  return (
    <>
      <ambientLight intensity={config.ambientIntensity} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={config.directionalIntensity}
        castShadow
      />
      <pointLight
        position={[0, 0, 0]}
        intensity={config.pointLightIntensity}
        distance={300}
        decay={2}
        color="#ffffff"
      />
    </>
  );
};
