// src/hooks/usePlanetClick.ts
// Hook for raycasting and planet click detection

import { useCameraStore } from "@/store/cameraStore";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface UsePlanetClickProps {
  planetMeshRefs: Map<string, THREE.Mesh>;
}

export const usePlanetClick = ({ planetMeshRefs }: UsePlanetClickProps) => {
  const { camera, gl } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const { selectPlanet, isAnimating } = useCameraStore();

  useEffect(() => {
    const canvas = gl.domElement;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);

      const meshes = Array.from(planetMeshRefs.values());
      const intersects = raycaster.current.intersectObjects(meshes, false);

      if (intersects.length > 0) {
        canvas.style.cursor = "pointer";
      } else {
        canvas.style.cursor = "default";
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (isAnimating) return;

      const rect = canvas.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);

      const meshes = Array.from(planetMeshRefs.values());
      const intersects = raycaster.current.intersectObjects(meshes, false);

      if (intersects.length > 0 && intersects[0]) {
        const clickedMesh = intersects[0].object as THREE.Mesh;
        const parent = clickedMesh.parent;

        for (const [name, mesh] of planetMeshRefs.entries()) {
          if (mesh === clickedMesh || (parent && mesh === parent)) {
            selectPlanet(name);
            break;
          }
        }
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      canvas.style.cursor = "default";
    };
  }, [camera, gl, planetMeshRefs, selectPlanet, isAnimating]);
};
