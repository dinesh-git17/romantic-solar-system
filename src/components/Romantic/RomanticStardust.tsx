// src/components/Romantic/RomanticStardust.tsx
// Magical floating stardust particles for romantic mode

import { useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

interface ParticleData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  scale: number;
  color: THREE.Color;
  twinkleOffset: number;
}

export const RomanticStardust: React.FC = () => {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  const { camera } = useThree();
  const timeRef = useRef(0);

  const particleCount = 300;

  const colors = ["#FF69B4", "#DA70D6", "#FF1493", "#FFB6C1", "#DDA0DD"];

  const particleData = useMemo(() => {
    const data: ParticleData[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 80 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      const position = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        (Math.random() - 0.5) * 80,
        radius * Math.sin(phi) * Math.sin(theta)
      );

      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.1
      );

      const scale = 0.1 + Math.random() * 0.3;
      const colorIndex = Math.floor(Math.random() * colors.length);
      const color = new THREE.Color(colors[colorIndex]);
      const twinkleOffset = Math.random() * Math.PI * 2;

      data.push({ position, velocity, scale, color, twinkleOffset });
    }

    return data;
  }, []);

  useEffect(() => {
    if (!instancedMeshRef.current) return;

    const dummy = new THREE.Object3D();
    const tempColor = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      const particle = particleData[i];
      if (!particle) continue;

      dummy.position.copy(particle.position);
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();

      instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
      instancedMeshRef.current.setColorAt(i, tempColor.copy(particle.color));
    }

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    if (instancedMeshRef.current.instanceColor) {
      instancedMeshRef.current.instanceColor.needsUpdate = true;
    }
  }, [particleData]);

  useEffect(() => {
    const animate = () => {
      if (!instancedMeshRef.current) return;

      timeRef.current += 0.016;

      const dummy = new THREE.Object3D();
      const cameraPosition = camera.position.clone();

      for (let i = 0; i < particleCount; i++) {
        const particle = particleData[i];
        if (!particle) continue;

        particle.position.add(particle.velocity);

        const distanceFromCamera = particle.position.distanceTo(cameraPosition);
        if (distanceFromCamera > 200) {
          const direction = cameraPosition
            .clone()
            .sub(particle.position)
            .normalize();
          particle.position.add(direction.multiplyScalar(5));
        }

        const twinkle =
          0.3 +
          Math.sin(timeRef.current * 2 + particle.twinkleOffset) * 0.3 +
          0.4;
        const currentScale = particle.scale * twinkle;

        dummy.position.copy(particle.position);
        dummy.scale.setScalar(currentScale);
        dummy.updateMatrix();

        instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
      }

      instancedMeshRef.current.instanceMatrix.needsUpdate = true;

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [particleData, camera]);

  return (
    <instancedMesh
      ref={instancedMeshRef}
      args={[undefined, undefined, particleCount]}
    >
      <sphereGeometry args={[0.5, 8, 8]} />
      <meshBasicMaterial
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
};
