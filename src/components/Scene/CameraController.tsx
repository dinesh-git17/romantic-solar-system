// src/components/Scene/CameraController.tsx
// Dynamic OrbitControls with camera animation support

import { useCameraStore } from "@/store/cameraStore";
import type { ControlsConfig } from "@/types/scene.types";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { ForwardedRef } from "react";
import { forwardRef, useEffect } from "react";
import type { Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

interface CameraControllerProps {
  config: ControlsConfig;
  dynamicTarget?: Vector3;
  planetRadius?: number;
}

const CameraControllerComponent = (
  props: CameraControllerProps,
  ref: ForwardedRef<OrbitControlsImpl>
) => {
  const { config, dynamicTarget, planetRadius } = props;
  const { selectedPlanet, isAnimating } = useCameraStore();

  const minDistance = selectedPlanet
    ? (planetRadius ?? 1) * 2
    : config.minDistance;

  const maxDistance = selectedPlanet
    ? (planetRadius ?? 1) * 8
    : config.maxDistance;

  useEffect(() => {
    if (
      ref &&
      typeof ref !== "function" &&
      ref.current &&
      dynamicTarget &&
      !isAnimating &&
      selectedPlanet
    ) {
      ref.current.target.copy(dynamicTarget);
      ref.current.update();
    }
  }, [dynamicTarget, isAnimating, ref, selectedPlanet]);

  useFrame(() => {
    if (
      ref &&
      typeof ref !== "function" &&
      ref.current &&
      dynamicTarget &&
      selectedPlanet &&
      !isAnimating
    ) {
      ref.current.target.copy(dynamicTarget);
      ref.current.update();
    }
  });

  return (
    <OrbitControls
      ref={ref}
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
};

CameraControllerComponent.displayName = "CameraController";

export const CameraController = forwardRef(CameraControllerComponent);
