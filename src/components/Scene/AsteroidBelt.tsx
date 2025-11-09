// src/components/Scene/AsteroidBelt.tsx
// GPU-instanced asteroid belt between Mars and Jupiter

import type { AsteroidBeltConfig } from "@/types/scene.types";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

interface AsteroidBeltProps {
  config: AsteroidBeltConfig;
}

interface AsteroidData {
  angle: number;
  radius: number;
  speed: number;
  rotationSpeed: THREE.Euler;
  scale: number;
  color: THREE.Color;
}

export const AsteroidBelt: React.FC<AsteroidBeltProps> = ({ config }) => {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);

  const asteroidData = useMemo(() => {
    const data: AsteroidData[] = [];

    for (let i = 0; i < config.count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius =
        config.innerRadius +
        Math.random() * (config.outerRadius - config.innerRadius);
      const speed = config.revolutionSpeed / radius;
      const rotationSpeed = new THREE.Euler(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );
      const scale =
        config.minSize + Math.random() * (config.maxSize - config.minSize);
      const colorIndex = Math.floor(Math.random() * config.colors.length);
      const color = new THREE.Color(config.colors[colorIndex]);

      data.push({ angle, radius, speed, rotationSpeed, scale, color });
    }

    return data;
  }, [
    config.count,
    config.innerRadius,
    config.outerRadius,
    config.revolutionSpeed,
    config.minSize,
    config.maxSize,
    config.colors,
  ]);

  useEffect(() => {
    if (!instancedMeshRef.current) return;

    const dummy = new THREE.Object3D();
    const tempColor = new THREE.Color();

    for (let i = 0; i < config.count; i++) {
      const asteroid = asteroidData[i];
      if (!asteroid) continue;

      const { angle, radius, scale } = asteroid;

      dummy.position.set(
        radius * Math.cos(angle),
        (Math.random() - 0.5) * config.verticalSpread,
        radius * Math.sin(angle)
      );
      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();

      instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
      instancedMeshRef.current.setColorAt(i, tempColor.copy(asteroid.color));
    }

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    if (instancedMeshRef.current.instanceColor) {
      instancedMeshRef.current.instanceColor.needsUpdate = true;
    }
  }, [config.count, config.verticalSpread, asteroidData]);

  useFrame((_state, delta) => {
    if (!instancedMeshRef.current) return;

    const dummy = new THREE.Object3D();

    for (let i = 0; i < config.count; i++) {
      const asteroid = asteroidData[i];
      if (!asteroid) continue;

      asteroid.angle += delta * asteroid.speed;

      const { angle, radius, scale, rotationSpeed } = asteroid;

      dummy.position.set(
        radius * Math.cos(angle),
        dummy.position.y,
        radius * Math.sin(angle)
      );
      dummy.rotation.x += delta * rotationSpeed.x;
      dummy.rotation.y += delta * rotationSpeed.y;
      dummy.rotation.z += delta * rotationSpeed.z;
      dummy.scale.setScalar(scale);
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
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial roughness={0.9} metalness={0.1} />
    </instancedMesh>
  );
};
