// src/App.tsx

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { LandingPage } from "./components/Landing/LandingPage";
import { SceneSetup } from "./components/Scene/SceneSetup";
import { AudioControls } from "./components/UI/AudioControls";
import { AudioPlayer } from "./components/UI/AudioPlayer";
import { BackToHomeButton } from "./components/UI/BackToHomeButton";
import { BackToOverviewButton } from "./components/UI/BackToOverviewButton";
import { DeveloperAttribution } from "./components/UI/DeveloperAttribution";
import { EnableSoundButton } from "./components/UI/EnableSoundButton";
import { PlanetInfoPanel } from "./components/UI/PlanetInfoPanel";
import { useAppStore } from "./store/appStore";
import { useAudioStore } from "./store/audioStore";
import { useCameraStore } from "./store/cameraStore";
import { useRomanticStore } from "./store/romanticStore";
import type { AppMode } from "./types/app.types";
import type { SceneConfig } from "./types/scene.types";

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
  planetarySystem: {
    showOrbits: true,
    orbitOpacity: 0.05,
    planets: [
      {
        name: "Mercury",
        radius: 1.5,
        orbitalRadius: 18,
        eccentricity: 0.206,
        axialTilt: 0.034,
        rotationSpeed: 0.017,
        revolutionSpeed: 0.047,
        initialAngle: 0,
        textureUrl: "/textures/8k_mercury.jpg",
        color: "#8C7853",
      },
      {
        name: "Venus",
        radius: 2.5,
        orbitalRadius: 28,
        eccentricity: 0.007,
        axialTilt: 3.09,
        rotationSpeed: 0.004,
        revolutionSpeed: 0.035,
        initialAngle: 1.2,
        textureUrl: "/textures/8k_venus_surface.jpg",
        color: "#FFC649",
      },
      {
        name: "Earth",
        radius: 2.8,
        orbitalRadius: 40,
        eccentricity: 0.017,
        axialTilt: 0.41,
        rotationSpeed: 0.1,
        revolutionSpeed: 0.03,
        initialAngle: 3.4,
        textureUrl: "/textures/8k_earth_daymap.jpg",
        color: "#4169E1",
        hasAtmosphere: true,
        hasCloudLayer: true,
        cloudTextureUrl: "/textures/8k_earth_clouds.jpg",
        cloudRotationSpeed: 0.08,
        cloudOpacity: 0.5,
      },
      {
        name: "Mars",
        radius: 2.0,
        orbitalRadius: 55,
        eccentricity: 0.093,
        axialTilt: 0.44,
        rotationSpeed: 0.097,
        revolutionSpeed: 0.024,
        initialAngle: 4.9,
        textureUrl: "/textures/8k_mars.jpg",
        color: "#CD5C5C",
      },
      {
        name: "Jupiter",
        radius: 8,
        orbitalRadius: 80,
        eccentricity: 0.048,
        axialTilt: 0.05,
        rotationSpeed: 0.24,
        revolutionSpeed: 0.013,
        initialAngle: 0.9,
        textureUrl: "/textures/8k_jupiter.jpg",
        color: "#DAA520",
        emissive: "#8B4513",
        emissiveIntensity: 0.2,
      },
      {
        name: "Saturn",
        radius: 7,
        orbitalRadius: 110,
        eccentricity: 0.054,
        axialTilt: 0.47,
        rotationSpeed: 0.22,
        revolutionSpeed: 0.009,
        initialAngle: 2.5,
        textureUrl: "/textures/8k_saturn.jpg",
        color: "#F4A460",
        hasRings: true,
        ringInnerRadius: 8,
        ringOuterRadius: 14,
      },
      {
        name: "Uranus",
        radius: 4,
        orbitalRadius: 145,
        eccentricity: 0.047,
        axialTilt: 1.71,
        rotationSpeed: 0.14,
        revolutionSpeed: 0.007,
        initialAngle: 4.2,
        textureUrl: "/textures/2k_uranus.jpg",
        color: "#4FD0E0",
      },
      {
        name: "Neptune",
        radius: 4,
        orbitalRadius: 180,
        eccentricity: 0.009,
        axialTilt: 0.49,
        rotationSpeed: 0.15,
        revolutionSpeed: 0.005,
        initialAngle: 5.7,
        textureUrl: "/textures/2k_neptune.jpg",
        color: "#4169E1",
        emissive: "#1E90FF",
        emissiveIntensity: 0.1,
      },
    ],
    asteroidBelt: {
      innerRadius: 65,
      outerRadius: 75,
      count: 2000,
      minSize: 0.1,
      maxSize: 0.5,
      verticalSpread: 2,
      colors: ["#8C7853", "#6B5B4D", "#4A4A4A"],
      revolutionSpeed: 0.02,
    },
    comet: {
      enabled: true,
      orbitalRadius: 120,
      eccentricity: 0.92,
      revolutionSpeed: 0.015,
      initialAngle: 0,
      nucleusRadius: 0.5,
      nucleusColor: "#E0E0E0",
      nucleusEmissive: "#88CCFF",
      nucleusEmissiveIntensity: 1.5,
      tailParticleCount: 150,
      tailLength: 25,
      tailColor: "#66AAFF",
    },
    saturnParticles: {
      enabled: true,
      count: 800,
      minRadius: 8,
      maxRadius: 14,
      colors: ["#C9B79C", "#F4A460"],
      particleSize: 0.08,
    },
  },
};

function App() {
  const { showLanding, mode, setMode, hideLanding } = useAppStore();
  const { deselectPlanet, selectedPlanet, setViewMode } = useCameraStore();
  const { isAutoplayBlocked, play } = useAudioStore();
  const { hasSeenRomanticOpening } = useRomanticStore();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selectedPlanet) {
        deselectPlanet();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [deselectPlanet, selectedPlanet]);

  const handleModeSelect = (selectedMode: AppMode) => {
    setMode(selectedMode);
    setViewMode(selectedMode);
    setIsTransitioning(true);

    useAudioStore.getState().setTrack(selectedMode);
    useAudioStore.getState().play();

    setTimeout(() => {
      hideLanding();
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 1000);
  };

  const handleEnableSound = () => {
    play();
  };

  const shouldShowOpeningSequence =
    mode === "romantic" && !hasSeenRomanticOpening;

  return (
    <div className="w-screen h-screen relative">
      {showLanding && (
        <div
          className={`absolute inset-0 z-50 transition-opacity duration-1000 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <LandingPage onModeSelect={handleModeSelect} />
        </div>
      )}

      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          showLanding ? "opacity-0" : "opacity-100"
        }`}
      >
        <Canvas
          camera={{ position: [0, 50, 100], fov: 60 }}
          gl={{
            antialias: true,
            toneMapping: 2,
            toneMappingExposure: 1.0,
          }}
          frameloop="always"
        >
          <SceneSetup
            config={sceneConfig}
            showHelpers={false}
            enableOpeningSequence={shouldShowOpeningSequence}
          />
        </Canvas>
        {!showLanding && (
          <>
            <AudioPlayer mode={mode} />
            <AudioControls />
            {isAutoplayBlocked && (
              <EnableSoundButton onEnable={handleEnableSound} />
            )}
            <BackToHomeButton />
            <BackToOverviewButton />
            <PlanetInfoPanel />
            <DeveloperAttribution />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
