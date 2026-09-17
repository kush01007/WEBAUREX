"use client";

import { useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import GridEngine from "./GridEngine";
import GridLighting from "./GridLighting";
import { DESKTOP_GRID, MOBILE_GRID } from "./gridConfig";

const mobileQuery = "(max-width: 767px)";
const subscribe = callback => {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
const getSnapshot = () => window.matchMedia(mobileQuery).matches;
const getServerSnapshot = () => false;

export default function LivingGridCanvas() {
  const mobile = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const config = mobile ? MOBILE_GRID : DESKTOP_GRID;

  return (
    <Canvas
      aria-hidden="true"
      dpr={[1, 1.5]}
      frameloop="demand"
      shadows="soft"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <PerspectiveCamera
        makeDefault
        fov={config.camera.fov}
        position={config.camera.position}
        near={0.1}
        far={50}
      />
      <GridLighting />
      <GridEngine config={config} />
    </Canvas>
  );
}
