// src/components/Scene/Planet.tsx

import type { PlanetConfig } from "@/types/scene.types";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { Group, Mesh } from "three";
import { SaturnRings } from "./SaturnRings";

interface PlanetProps {
  config: PlanetConfig;
  onMeshReady?: (name: string, mesh: Mesh) => void;
}

const PlanetWithTextureAndClouds: React.FC<{
  config: PlanetConfig;
  textureUrl: string;
  cloudTextureUrl: string;
  onMeshReady?: (name: string, mesh: Mesh) => void;
}> = ({ config, textureUrl, cloudTextureUrl, onMeshReady }) => {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const cloudMeshRef = useRef<Mesh>(null);
  const timeRef = useRef(0);

  const texture = useTexture(textureUrl);
  const cloudTexture = useTexture(cloudTextureUrl);

  useEffect(() => {
    if (meshRef.current && onMeshReady) {
      onMeshReady(config.name, meshRef.current);
    }
  }, [config.name, onMeshReady]);

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

    if (cloudMeshRef.current && config.cloudRotationSpeed) {
      cloudMeshRef.current.rotation.y += delta * config.cloudRotationSpeed;
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
        <mesh ref={cloudMeshRef}>
          <sphereGeometry args={[config.radius + 0.1, 64, 64]} />
          <meshStandardMaterial
            map={cloudTexture}
            transparent
            opacity={config.cloudOpacity ?? 0.5}
            depthWrite={false}
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

const PlanetWithTexture: React.FC<{
  config: PlanetConfig;
  textureUrl: string;
  onMeshReady?: (name: string, mesh: Mesh) => void;
}> = ({ config, textureUrl, onMeshReady }) => {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const timeRef = useRef(0);

  const texture = useTexture(textureUrl);

  useEffect(() => {
    if (meshRef.current && onMeshReady) {
      onMeshReady(config.name, meshRef.current);
    }
  }, [config.name, onMeshReady]);

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

const PlanetWithoutTexture: React.FC<{
  config: PlanetConfig;
  onMeshReady?: (name: string, mesh: Mesh) => void;
}> = ({ config, onMeshReady }) => {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    if (meshRef.current && onMeshReady) {
      onMeshReady(config.name, meshRef.current);
    }
  }, [config.name, onMeshReady]);

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

export const Planet: React.FC<PlanetProps> = ({ config, onMeshReady }) => {
  if (config.textureUrl && config.hasCloudLayer && config.cloudTextureUrl) {
    return (
      <PlanetWithTextureAndClouds
        config={config}
        textureUrl={config.textureUrl}
        cloudTextureUrl={config.cloudTextureUrl}
        onMeshReady={onMeshReady}
      />
    );
  }

  if (config.textureUrl) {
    return (
      <PlanetWithTexture
        config={config}
        textureUrl={config.textureUrl}
        onMeshReady={onMeshReady}
      />
    );
  }

  return <PlanetWithoutTexture config={config} onMeshReady={onMeshReady} />;
};
