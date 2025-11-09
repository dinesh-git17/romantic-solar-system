// src/components/Scene/Effects.tsx

import type { SunConfig } from "@/types/scene.types";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

interface EffectsProps {
  sunConfig: SunConfig;
}

export const Effects: React.FC<EffectsProps> = ({ sunConfig }) => {
  return (
    <EffectComposer>
      <Bloom
        intensity={sunConfig.glowStrength}
        luminanceThreshold={0.1}
        luminanceSmoothing={0.9}
        radius={0.8}
      />
    </EffectComposer>
  );
};
