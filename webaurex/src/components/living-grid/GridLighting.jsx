"use client";

export default function GridLighting() {
  return (
    <>
      <ambientLight intensity={1.45} />
      <directionalLight
        castShadow
        color="#ffffff"
        intensity={2.25}
        position={[-3.8, 5.2, 11]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={28}
        shadow-camera-left={-8.5}
        shadow-camera-right={8.5}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0002}
        shadow-radius={7}
      />
      <directionalLight color="#ffffff" intensity={0.38} position={[6, -2, 7]} />
    </>
  );
}
