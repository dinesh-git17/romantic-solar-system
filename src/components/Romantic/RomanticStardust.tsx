// src/components/Romantic/RomanticOpeningSequence.tsx
// Camera animation ONLY - no DOM components

import { useCameraStore } from "@/store/cameraStore";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { OrbitControls } from "three-stdlib";

interface RomanticOpeningSequenceProps {
  controlsRef: React.RefObject<OrbitControls | null>;
}

const easeInOutQuad = (t: number): number => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

export const RomanticOpeningSequence: React.FC<
  RomanticOpeningSequenceProps
> = ({ controlsRef }) => {
  const { camera } = useThree();
  const { setAnimating } = useCameraStore();

  const startTime = useRef<number | null>(null);
  const isComplete = useRef(false);
  const startPosition = useRef(new THREE.Vector3(100, 40, 100));
  const endPosition = useRef(new THREE.Vector3(0, 50, 100));
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));

  const animationDuration = 8000;

  useEffect(() => {
    setAnimating(true);
    camera.position.copy(startPosition.current);
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
    const easedProgress = easeInOutQuad(progress);

    camera.position.lerpVectors(
      startPosition.current,
      endPosition.current,
      easedProgress
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
