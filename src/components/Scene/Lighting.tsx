// src/components/Scene/Lighting.tsx
// Dynamic lighting system with camera-aware illumination for planet focus mode

import { useCameraStore } from "@/store/cameraStore";
import type { LightingConfig } from "@/types/scene.types";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface LightingProps {
  config: LightingConfig;
}

export const Lighting: React.FC<LightingProps> = ({ config }) => {
  const { selectedPlanet } = useCameraStore();
  const { camera } = useThree();
  const cameraLightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (cameraLightRef.current && selectedPlanet) {
      cameraLightRef.current.position.copy(camera.position);
    }
  });

  const ambientIntensity = selectedPlanet ? 0.8 : config.ambientIntensity;

  return (
    <>
      <ambientLight intensity={ambientIntensity} />
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
      {selectedPlanet && (
        <pointLight
          ref={cameraLightRef}
          intensity={2.5}
          distance={50}
          decay={1}
          color="#ffffff"
        />
      )}
    </>
  );
};
