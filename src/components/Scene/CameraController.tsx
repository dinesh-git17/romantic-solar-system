// src/components/Scene/CameraController.tsx

import { useCameraStore } from "@/store/cameraStore";
import type { ControlsConfig } from "@/types/scene.types";
import { OrbitControls } from "@react-three/drei";
import type { ForwardedRef } from "react";
import { forwardRef } from "react";
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
  const { config, planetRadius } = props;
  const { selectedPlanet, isAnimating } = useCameraStore();

  const minDistance = selectedPlanet
    ? (planetRadius ?? 1) * 2
    : config.minDistance;

  const maxDistance = selectedPlanet
    ? (planetRadius ?? 1) * 8
    : config.maxDistance;

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
