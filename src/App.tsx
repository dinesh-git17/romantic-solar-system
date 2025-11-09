// src/App.tsx
import { SceneSetup } from "@/components/Scene/SceneSetup";
import { Canvas } from "@react-three/fiber";

const App = () => {
  return (
    <Canvas
      camera={{
        position: [0, 50, 100],
        fov: 75,
        near: 0.1,
        far: 2000,
      }}
      shadows
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      style={{
        width: "100vw",
        height: "100vh",
        display: "block",
      }}
    >
      <color attach="background" args={["#000000"]} />
      <SceneSetup showHelpers={false} />
    </Canvas>
  );
};

export default App;
