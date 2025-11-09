// src/components/Scene/CameraController.tsx
import type { ControlsConfig } from "@/types/scene.types";
import { OrbitControls } from "@react-three/drei";
import { memo } from "react";

interface CameraControllerProps {
  config: ControlsConfig;
}

export const CameraController = memo<CameraControllerProps>(({ config }) => {
  return (
    <OrbitControls
      enableDamping={config.enableDamping}
      dampingFactor={config.dampingFactor}
      minDistance={config.minDistance}
      maxDistance={config.maxDistance}
      minPolarAngle={config.minPolarAngle}
      maxPolarAngle={config.maxPolarAngle}
      enablePan={config.enablePan}
      panSpeed={config.panSpeed}
      rotateSpeed={config.rotateSpeed}
      zoomSpeed={config.zoomSpeed}
      autoRotate={config.autoRotate}
      autoRotateSpeed={config.autoRotateSpeed}
      makeDefault
    />
  );
});
