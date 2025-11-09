// src/components/Scene/OrbitRing.tsx

import type { OrbitRingConfig } from "@/types/scene.types";
import { useMemo } from "react";
import * as THREE from "three";

interface OrbitRingProps {
  config: OrbitRingConfig;
}

export const OrbitRing: React.FC<OrbitRingProps> = ({ config }) => {
  const { orbitalRadius, eccentricity, segments, color, opacity } = config;

  const points = useMemo(() => {
    const curve = new THREE.EllipseCurve(
      eccentricity * orbitalRadius,
      0,
      orbitalRadius,
      orbitalRadius * Math.sqrt(1 - eccentricity * eccentricity),
      0,
      2 * Math.PI,
      false,
      0
    );

    return curve.getPoints(segments);
  }, [orbitalRadius, eccentricity, segments]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  return (
    <primitive
      object={
        new THREE.Line(
          lineGeometry,
          new THREE.LineBasicMaterial({
            color,
            transparent: true,
            opacity,
          })
        )
      }
      rotation={[Math.PI / 2, 0, 0]}
    />
  );
};
