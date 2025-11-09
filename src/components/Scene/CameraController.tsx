// src/components/Scene/CameraController.tsx
// Dynamic OrbitControls with camera animation support

import { useCameraStore } from "@/store/cameraStore";
import type { ControlsConfig } from "@/types/scene.types";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, useEffect, useRef } from "react";
import type { Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

interface CameraControllerProps {
  config: ControlsConfig;
  dynamicTarget?: Vector3;
  planetRadius?: number;
}

export const CameraController = memo<CameraControllerProps>(
  ({ config, dynamicTarget, planetRadius }) => {
    const controlsRef = useRef<OrbitControlsImpl>(null);
    const { selectedPlanet, isAnimating } = useCameraStore();

    const minDistance = selectedPlanet
      ? (planetRadius ?? 1) * 2
      : config.minDistance;

    const maxDistance = selectedPlanet
      ? (planetRadius ?? 1) * 8
      : config.maxDistance;

    useEffect(() => {
      if (controlsRef.current && dynamicTarget && !isAnimating) {
        controlsRef.current.target.copy(dynamicTarget);
        controlsRef.current.update();
      }
    }, [dynamicTarget, isAnimating]);

    useFrame(() => {
      if (controlsRef.current && dynamicTarget && selectedPlanet) {
        controlsRef.current.target.copy(dynamicTarget);
        controlsRef.current.update();
      }
    });

    return (
      <OrbitControls
        ref={controlsRef}
        enableDamping={config.enableDamping}
        dampingFactor={config.dampingFactor}
        minDistance={minDistance}
        maxDistance={maxDistance}
        minPolarAngle={config.minPolarAngle}
        maxPolarAngle={config.maxPolarAngle}
        enablePan={config.enablePan}
        panSpeed={config.panSpeed}
        rotateSpeed={config.rotateSpeed}
        zoomSpeed={config.zoomSpeed}
        autoRotate={selectedPlanet ? false : config.autoRotate}
        autoRotateSpeed={config.autoRotateSpeed}
        enabled={!isAnimating}
        makeDefault
      />
    );
  }
);
