// src/App.tsx

import { SceneSetup } from "@/components/Scene/SceneSetup";
import type { SceneConfig } from "@/types/scene.types";
import { Canvas } from "@react-three/fiber";

const sceneConfig: SceneConfig = {
  starfield: {
    count: 8000,
    radius: 150,
    depth: 200,
  },
  lighting: {
    ambientIntensity: 0.3,
    directionalIntensity: 1.5,
    pointLightIntensity: 5.0,
  },
  controls: {
    enableDamping: true,
    dampingFactor: 0.05,
    minDistance: 10,
    maxDistance: 200,
    minPolarAngle: 0.1,
    maxPolarAngle: Math.PI - 0.1,
    enablePan: true,
    panSpeed: 1.0,
    rotateSpeed: 1.0,
    zoomSpeed: 1.0,
    autoRotate: false,
    autoRotateSpeed: 0.5,
  },
  helpers: {
    grid: {
      size: 100,
      divisions: 10,
      colorCenterLine: "#444444",
      colorGrid: "#222222",
    },
    axes: {
      size: 50,
    },
  },
  sun: {
    radius: 12,
    emissiveIntensity: 2.0,
    rotationSpeed: 0.05,
    glowStrength: 1.5,
    textureUrl: "/textures/8k_sun.jpg",
  },
};

function App() {
  return (
    <div className="w-screen h-screen">
      <Canvas
        camera={{ position: [0, 50, 100], fov: 60 }}
        gl={{
          antialias: true,
          toneMapping: 2,
          toneMappingExposure: 1.0,
        }}
        frameloop="always"
      >
        <SceneSetup config={sceneConfig} showHelpers={false} />
      </Canvas>
    </div>
  );
}

export default App;
