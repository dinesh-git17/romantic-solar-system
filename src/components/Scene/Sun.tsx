// src/components/Scene/Sun.tsx

import type { SunConfig } from "@/types/scene.types";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";
import { TextureLoader } from "three";

interface SunProps {
  config: SunConfig;
}

export const Sun: React.FC<SunProps> = ({ config }) => {
  const meshRef = useRef<Mesh>(null);

  const texture = useLoader(
    TextureLoader,
    config.textureUrl ?? "",
    undefined,
    () => {
      return null;
    }
  );

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * config.rotationSpeed;
    }
  });

  const validTexture = config.textureUrl ? texture : null;

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[config.radius, 64, 64]} />
      <meshStandardMaterial
        map={validTexture}
        emissive="#ffaa00"
        emissiveIntensity={config.emissiveIntensity}
        emissiveMap={validTexture}
        toneMapped={false}
      />
    </mesh>
  );
};
