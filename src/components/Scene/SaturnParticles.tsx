// src/components/Scene/SaturnParticles.tsx
// GPU-instanced particle effects around Saturn's rings

import type { SaturnParticlesConfig } from "@/types/scene.types";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

interface SaturnParticlesProps {
  config: SaturnParticlesConfig;
  saturnPosition: THREE.Vector3;
}

interface ParticleData {
  angle: number;
  radius: number;
  speed: number;
  color: THREE.Color;
}

export const SaturnParticles: React.FC<SaturnParticlesProps> = ({
  config,
  saturnPosition,
}) => {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);

  const particleData = useMemo(() => {
    const data: ParticleData[] = [];

    for (let i = 0; i < config.count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius =
        config.minRadius +
        Math.random() * (config.maxRadius - config.minRadius);
      const speed = 0.1 / radius;
      const colorIndex = Math.floor(Math.random() * config.colors.length);
      const color = new THREE.Color(config.colors[colorIndex]);

      data.push({ angle, radius, speed, color });
    }

    return data;
  }, [config.count, config.minRadius, config.maxRadius, config.colors]);

  useEffect(() => {
    if (!instancedMeshRef.current) return;

    const dummy = new THREE.Object3D();
    const tempColor = new THREE.Color();

    for (let i = 0; i < config.count; i++) {
      const particle = particleData[i];
      if (!particle) continue;

      const { angle, radius } = particle;

      dummy.position.set(
        radius * Math.cos(angle),
        (Math.random() - 0.5) * 0.5,
        radius * Math.sin(angle)
      );
      dummy.scale.setScalar(config.particleSize);
      dummy.updateMatrix();

      instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
      instancedMeshRef.current.setColorAt(i, tempColor.copy(particle.color));
    }

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    if (instancedMeshRef.current.instanceColor) {
      instancedMeshRef.current.instanceColor.needsUpdate = true;
    }
  }, [config.count, config.particleSize, particleData]);

  useFrame((_state, delta) => {
    if (!instancedMeshRef.current) return;

    const dummy = new THREE.Object3D();

    for (let i = 0; i < config.count; i++) {
      const particle = particleData[i];
      if (!particle) continue;

      particle.angle += delta * particle.speed;

      const { angle, radius } = particle;

      dummy.position.set(
        saturnPosition.x + radius * Math.cos(angle),
        saturnPosition.y + (Math.random() - 0.5) * 0.5,
        saturnPosition.z + radius * Math.sin(angle)
      );
      dummy.scale.setScalar(config.particleSize);
      dummy.updateMatrix();

      instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
    }

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={instancedMeshRef}
      args={[undefined, undefined, config.count]}
    >
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial
        emissive="#ffffff"
        emissiveIntensity={0.3}
        transparent
        opacity={0.8}
      />
    </instancedMesh>
  );
};
