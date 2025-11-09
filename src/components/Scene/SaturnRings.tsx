// src/components/Scene/SaturnRings.tsx

import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface SaturnRingsProps {
  innerRadius: number;
  outerRadius: number;
  textureUrl?: string;
}

const SaturnRingsWithTexture: React.FC<{
  innerRadius: number;
  outerRadius: number;
  textureUrl: string;
}> = ({ innerRadius, outerRadius, textureUrl }) => {
  const texture = useTexture(textureUrl);

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[innerRadius, outerRadius, 64]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const SaturnRingsWithoutTexture: React.FC<{
  innerRadius: number;
  outerRadius: number;
}> = ({ innerRadius, outerRadius }) => {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[innerRadius, outerRadius, 64]} />
      <meshStandardMaterial
        color="#C9B79C"
        transparent
        opacity={0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export const SaturnRings: React.FC<SaturnRingsProps> = ({
  innerRadius,
  outerRadius,
  textureUrl,
}) => {
  if (textureUrl) {
    return (
      <SaturnRingsWithTexture
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        textureUrl={textureUrl}
      />
    );
  }
  return (
    <SaturnRingsWithoutTexture
      innerRadius={innerRadius}
      outerRadius={outerRadius}
    />
  );
};
