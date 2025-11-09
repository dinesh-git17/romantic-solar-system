// src/components/Scene/Comet.tsx
// Comet with dynamic particle tail that points away from the Sun

import type { CometConfig } from "@/types/scene.types";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface CometProps {
  config: CometConfig;
}

export const Comet: React.FC<CometProps> = ({ config }) => {
  const nucleusRef = useRef<THREE.Mesh>(null);
  const tailRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const tailGeometry = useMemo(() => {
    const positions = new Float32Array(config.tailParticleCount * 3);
    const alphas = new Float32Array(config.tailParticleCount);

    for (let i = 0; i < config.tailParticleCount; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      alphas[i] = 1.0 - i / config.tailParticleCount;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));

    return geometry;
  }, [config.tailParticleCount]);

  const tailMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: config.tailColor,
      size: 0.3,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [config.tailColor]);

  useFrame((_state, delta) => {
    timeRef.current += delta;

    const angle =
      config.initialAngle + timeRef.current * config.revolutionSpeed;
    const a = config.orbitalRadius;
    const e = config.eccentricity;
    const r = (a * (1 - e * e)) / (1 + e * Math.cos(angle));

    const cometX = r * Math.cos(angle);
    const cometZ = r * Math.sin(angle);

    if (nucleusRef.current) {
      nucleusRef.current.position.set(cometX, 0, cometZ);
    }

    if (
      tailRef.current &&
      tailGeometry.attributes.position &&
      tailGeometry.attributes.alpha
    ) {
      const positions = tailGeometry.attributes.position.array as Float32Array;
      const alphas = tailGeometry.attributes.alpha.array as Float32Array;

      const directionToSun = new THREE.Vector3(-cometX, 0, -cometZ).normalize();
      const awayFromSun = directionToSun.multiplyScalar(-1);

      for (let i = 0; i < config.tailParticleCount; i++) {
        const distance = (i / config.tailParticleCount) * config.tailLength;
        const spread = (i / config.tailParticleCount) * 0.5;

        const offsetX = (Math.random() - 0.5) * spread;
        const offsetY = (Math.random() - 0.5) * spread;

        positions[i * 3] = cometX + awayFromSun.x * distance + offsetX;
        positions[i * 3 + 1] = offsetY;
        positions[i * 3 + 2] = cometZ + awayFromSun.z * distance + offsetY;

        alphas[i] = (1.0 - i / config.tailParticleCount) * 0.8;
      }

      tailGeometry.attributes.position.needsUpdate = true;
      tailGeometry.attributes.alpha.needsUpdate = true;
    }
  });

  return (
    <group>
      <mesh ref={nucleusRef}>
        <sphereGeometry args={[config.nucleusRadius, 16, 16]} />
        <meshStandardMaterial
          color={config.nucleusColor}
          emissive={config.nucleusEmissive}
          emissiveIntensity={config.nucleusEmissiveIntensity}
        />
      </mesh>
      <points ref={tailRef} geometry={tailGeometry} material={tailMaterial} />
    </group>
  );
};
