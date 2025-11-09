// src/components/Scene/Planet.tsx

import type { PlanetConfig } from "@/types/scene.types";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";
import { SaturnRings } from "./SaturnRings";

interface PlanetProps {
  config: PlanetConfig;
}

const PlanetWithTexture: React.FC<{
  config: PlanetConfig;
  textureUrl: string;
}> = ({ config, textureUrl }) => {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const texture = useTexture(textureUrl);
  const timeRef = useRef(0);

  useFrame((_state, delta) => {
    timeRef.current += delta;

    if (groupRef.current) {
      const angle =
        config.initialAngle + timeRef.current * config.revolutionSpeed;
      const a = config.orbitalRadius;
      const e = config.eccentricity;
      const r = (a * (1 - e * e)) / (1 + e * Math.cos(angle));

      groupRef.current.position.x = r * Math.cos(angle);
      groupRef.current.position.z = r * Math.sin(angle);
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * config.rotationSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, config.axialTilt]}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[config.radius, 64, 64]} />
          <meshStandardMaterial
            map={texture}
            emissive={config.emissive ?? "#000000"}
            emissiveIntensity={config.emissiveIntensity ?? 0}
          />
        </mesh>
        {config.hasRings &&
          config.ringInnerRadius &&
          config.ringOuterRadius && (
            <SaturnRings
              innerRadius={config.ringInnerRadius}
              outerRadius={config.ringOuterRadius}
              textureUrl={config.ringTextureUrl}
            />
          )}
      </group>
    </group>
  );
};

const PlanetWithoutTexture: React.FC<{ config: PlanetConfig }> = ({
  config,
}) => {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const timeRef = useRef(0);

  useFrame((_state, delta) => {
    timeRef.current += delta;

    if (groupRef.current) {
      const angle =
        config.initialAngle + timeRef.current * config.revolutionSpeed;
      const a = config.orbitalRadius;
      const e = config.eccentricity;
      const r = (a * (1 - e * e)) / (1 + e * Math.cos(angle));

      groupRef.current.position.x = r * Math.cos(angle);
      groupRef.current.position.z = r * Math.sin(angle);
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * config.rotationSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, config.axialTilt]}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[config.radius, 64, 64]} />
          <meshStandardMaterial
            color={config.color}
            emissive={config.emissive ?? "#000000"}
            emissiveIntensity={config.emissiveIntensity ?? 0}
          />
        </mesh>
        {config.hasRings &&
          config.ringInnerRadius &&
          config.ringOuterRadius && (
            <SaturnRings
              innerRadius={config.ringInnerRadius}
              outerRadius={config.ringOuterRadius}
              textureUrl={config.ringTextureUrl}
            />
          )}
      </group>
    </group>
  );
};

export const Planet: React.FC<PlanetProps> = ({ config }) => {
  if (config.textureUrl) {
    return <PlanetWithTexture config={config} textureUrl={config.textureUrl} />;
  }
  return <PlanetWithoutTexture config={config} />;
};
