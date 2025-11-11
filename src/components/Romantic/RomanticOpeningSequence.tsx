// src/components/Romantic/RomanticOpeningSequence.tsx
// Cinematic slow-motion camera orbit with ultra-smooth movement

import { useCameraStore } from "@/store/cameraStore";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { OrbitControls } from "three-stdlib";

interface RomanticOpeningSequenceProps {
  controlsRef: React.RefObject<OrbitControls | null>;
}

const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export const RomanticOpeningSequence: React.FC<
  RomanticOpeningSequenceProps
> = ({ controlsRef }) => {
  const { camera } = useThree();
  const { setAnimating } = useCameraStore();

  const startTime = useRef<number | null>(null);
  const isComplete = useRef(false);
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));

  const animationDuration = 25000;
  const orbitRadius = 120;
  const orbitHeight = 60;

  useEffect(() => {
    setAnimating(true);
    const startAngle = Math.PI * 0.25;
    camera.position.set(
      Math.cos(startAngle) * orbitRadius,
      orbitHeight,
      Math.sin(startAngle) * orbitRadius
    );
    camera.lookAt(lookAtTarget.current);

    return () => {
      setAnimating(false);
    };
  }, [camera, setAnimating]);

  useFrame(() => {
    if (isComplete.current) return;

    const currentTime = performance.now();
    startTime.current ??= currentTime;

    const elapsed = currentTime - startTime.current;
    const progress = Math.min(elapsed / animationDuration, 1);
    const easedProgress = easeInOutCubic(progress);

    const startAngle = Math.PI * 0.25;
    const endAngle = startAngle + Math.PI * 1.0;
    const currentAngle = startAngle + (endAngle - startAngle) * easedProgress;

    const startHeight = orbitHeight;
    const endHeight = 50;
    const currentHeight =
      startHeight + (endHeight - startHeight) * easedProgress;

    const startRadius = orbitRadius;
    const endRadius = 100;
    const currentRadius =
      startRadius + (endRadius - startRadius) * easedProgress;

    camera.position.set(
      Math.cos(currentAngle) * currentRadius,
      currentHeight,
      Math.sin(currentAngle) * currentRadius
    );

    camera.lookAt(lookAtTarget.current);

    if (progress >= 1) {
      isComplete.current = true;
      setAnimating(false);

      if (controlsRef.current) {
        controlsRef.current.target.copy(lookAtTarget.current);
        controlsRef.current.update();
      }
    }
  });

  return null;
};
