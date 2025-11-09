// src/components/Scene/Sun.tsx

import type { SunConfig } from "@/types/scene.types";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

interface SunProps {
  config: SunConfig;
}

const SunWithTexture: React.FC<{ config: SunConfig; textureUrl: string }> = ({
  config,
  textureUrl,
}) => {
  const meshRef = useRef<Mesh>(null);
  const texture = useTexture(textureUrl);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * config.rotationSpeed;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[config.radius, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        emissive="#ffaa00"
        emissiveIntensity={config.emissiveIntensity}
        emissiveMap={texture}
        toneMapped={false}
      />
    </mesh>
  );
};

const SunWithoutTexture: React.FC<{ config: SunConfig }> = ({ config }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * config.rotationSpeed;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[config.radius, 64, 64]} />
      <meshStandardMaterial
        emissive="#ffaa00"
        emissiveIntensity={config.emissiveIntensity}
        toneMapped={false}
      />
    </mesh>
  );
};

export const Sun: React.FC<SunProps> = ({ config }) => {
  if (config.textureUrl) {
    return <SunWithTexture config={config} textureUrl={config.textureUrl} />;
  }
  return <SunWithoutTexture config={config} />;
};
