"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import GridLines from "./GridLines";
import { GRID_COLORS } from "./gridConfig";
import {
  getLivingGridProgress,
  subscribeLivingGridPointer,
  subscribeLivingGridProgress,
} from "./motionStore";

function gridPoint([column, row], config) {
  return new THREE.Vector2(
    -config.width / 2 + (column / config.columns) * config.width,
    config.height / 2 - (row / config.rows) * config.height,
  );
}

function createMonolithGeometry(config) {
  const outline = config.monolith.outline.map(point => gridPoint(point, config));
  const shape = new THREE.Shape();

  shape.moveTo(outline[0].x, outline[0].y);
  outline.slice(1).forEach(point => shape.lineTo(point.x, point.y));
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: config.monolith.depth,
    steps: 1,
    curveSegments: 1,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.026,
    bevelOffset: 0,
    bevelSegments: 2,
  });
  geometry.computeVertexNormals();
  return geometry;
}

function layerTransform(layer, config) {
  const cellWidth = config.width / config.columns;
  const cellHeight = config.height / config.rows;
  const overlap = 0.035;

  return {
    x: -config.width / 2 + (layer.column + layer.width / 2) * cellWidth,
    y: config.height / 2 - (layer.row + layer.height / 2) * cellHeight,
    width: cellWidth * layer.width + overlap,
    height: cellHeight * layer.height + overlap,
    depth: layer.depth,
  };
}

function StructuralLayers({ config, layerRefs }) {
  const geometry = useMemo(() => new RoundedBoxGeometry(1, 1, 1, 2, 0.018), []);
  useEffect(() => () => geometry.dispose(), [geometry]);

  return config.structuralLayers.map(layer => {
    const transform = layerTransform(layer, config);
    return (
      <mesh
        key={layer.role}
        ref={node => {
          if (node) layerRefs.current[layer.role] = node;
          else delete layerRefs.current[layer.role];
        }}
        geometry={geometry}
        position={[transform.x, transform.y, transform.depth / 2 + 0.045]}
        rotation={layer.rotation ?? [0, 0, 0]}
        scale={[transform.width, transform.height, transform.depth]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={GRID_COLORS.block} roughness={0.965} metalness={0} />
      </mesh>
    );
  });
}

function FoldedMonolith({ config, mainRef, layerRefs }) {
  const geometry = useMemo(() => createMonolithGeometry(config), [config]);
  const materials = useMemo(() => [
    new THREE.MeshStandardMaterial({
      color: GRID_COLORS.block,
      roughness: 0.97,
      metalness: 0,
    }),
    new THREE.MeshStandardMaterial({
      color: "#181818",
      roughness: 0.985,
      metalness: 0,
    }),
  ], []);

  useEffect(() => () => {
    geometry.dispose();
    materials.forEach(material => material.dispose());
  }, [geometry, materials]);

  return (
    <>
      <mesh
        ref={mainRef}
        geometry={geometry}
        material={materials}
        position={[0, 0, 0.04]}
        castShadow
        receiveShadow
      />
      <StructuralLayers config={config} layerRefs={layerRefs} />
    </>
  );
}

const layerMotion = {
  spine: { axis: "y", anchor: "start", at: 0.1, duration: 0.2 },
  shoulder: { axis: "x", anchor: "start", at: 0.24, duration: 0.17, folded: true },
  bridge: { axis: "x", anchor: "start", at: 0.32, duration: 0.24 },
  "return-wall": { axis: "y", anchor: "end", at: 0.46, duration: 0.22 },
  "chamber-floor": { axis: "x", anchor: "end", at: 0.61, duration: 0.18 },
  threshold: { axis: "x", anchor: "end", at: 0.67, duration: 0.17 },
  platform: { axis: "x", anchor: "start", at: 0.75, duration: 0.2, folded: true },
};

function addLayerBuild(timeline, node, motion) {
  const axis = motion.axis;
  const finalScale = node.scale[axis];
  const finalDepth = node.scale.z;
  const finalPosition = node.position[axis];
  const finalZ = node.position.z;
  const finalRotationX = node.rotation.x;
  const collapsedScale = Math.max(0.015, finalScale * 0.018);
  const direction = motion.anchor === "start" ? -1 : 1;

  node.scale[axis] = collapsedScale;
  node.scale.z = 0.018;
  node.position[axis] = finalPosition + direction * (finalScale - collapsedScale) / 2;
  node.position.z = 0.045;
  node.material.transparent = true;
  node.material.opacity = 0;

  if (motion.folded) node.rotation.x = finalRotationX + (motion.role === "platform" ? 0.72 : -0.82);

  timeline
    .to(node.material, {
      opacity: 1,
      duration: Math.min(0.08, motion.duration * 0.45),
      ease: "power2.out",
    }, motion.at)
    .to(node.scale, {
      [axis]: finalScale,
      z: finalDepth,
      duration: motion.duration,
      ease: "power3.inOut",
    }, motion.at)
    .to(node.position, {
      [axis]: finalPosition,
      z: finalZ,
      duration: motion.duration,
      ease: "power3.inOut",
    }, motion.at);

  if (motion.folded) {
    timeline.to(node.rotation, {
      x: finalRotationX,
      duration: motion.duration,
      ease: "power3.inOut",
    }, motion.at);
  }
}

export default function GridEngine({ config }) {
  const rootRef = useRef(null);
  const interactionRef = useRef(null);
  const mainRef = useRef(null);
  const layerRefs = useRef({});
  const { invalidate } = useThree();

  useLayoutEffect(() => {
    const root = rootRef.current;
    const main = mainRef.current;
    if (!root || !main) return undefined;

    const frontMaterial = main.material[0];
    const sideMaterial = main.material[1];
    const finalFront = new THREE.Color(GRID_COLORS.block);
    const finalSide = new THREE.Color("#181818");
    const initialFront = new THREE.Color("#151515");
    const initialSide = new THREE.Color("#242424");
    const finalMainZ = main.position.z;

    root.rotation.set(0, 0, 0);
    main.scale.z = 0.018;
    main.position.z = 0.018;
    frontMaterial.color.copy(initialFront);
    sideMaterial.color.copy(initialSide);

    const timeline = gsap.timeline({
      paused: true,
      onUpdate: invalidate,
    });

    timeline
      .to(root.rotation, {
        x: config.rotation[0],
        y: config.rotation[1],
        z: config.rotation[2],
        duration: 0.8,
        ease: "power2.inOut",
      }, 0.08)
      .to(main.scale, { z: 1, duration: 0.82, ease: "power2.inOut" }, 0.06)
      .to(main.position, { z: finalMainZ, duration: 0.82, ease: "power2.inOut" }, 0.06)
      .to(frontMaterial.color, {
        r: finalFront.r,
        g: finalFront.g,
        b: finalFront.b,
        duration: 0.82,
        ease: "power2.inOut",
      }, 0.08)
      .to(sideMaterial.color, {
        r: finalSide.r,
        g: finalSide.g,
        b: finalSide.b,
        duration: 0.82,
        ease: "power2.inOut",
      }, 0.08);

    Object.entries(layerMotion).forEach(([role, motion]) => {
      const node = layerRefs.current[role];
      if (node) addLayerBuild(timeline, node, { ...motion, role });
    });

    timeline.to({}, { duration: 0.04 }, 0.96);

    const applyProgress = progress => {
      timeline.progress(progress, false);
      invalidate();
    };
    const unsubscribe = subscribeLivingGridProgress(applyProgress);
    applyProgress(getLivingGridProgress());

    return () => {
      unsubscribe();
      timeline.kill();
    };
  }, [config, invalidate]);

  useEffect(() => {
    const interaction = interactionRef.current;
    if (!interaction) return undefined;

    const unsubscribe = subscribeLivingGridPointer(({ x, y, active }) => {
      const enabled = active && getLivingGridProgress() > 0.78;
      gsap.to(interaction.rotation, {
        x: enabled ? -y * 0.012 : 0,
        y: enabled ? x * 0.018 : 0,
        duration: 0.65,
        ease: "power3.out",
        overwrite: true,
        onUpdate: invalidate,
      });
      gsap.to(interaction.position, {
        x: enabled ? x * 0.035 : 0,
        y: enabled ? y * 0.025 : 0,
        duration: 0.65,
        ease: "power3.out",
        overwrite: true,
        onUpdate: invalidate,
      });
    });

    return () => {
      unsubscribe();
      gsap.killTweensOf([interaction.rotation, interaction.position]);
    };
  }, [invalidate]);

  return (
    <group ref={rootRef} rotation={config.rotation} position={config.position} scale={config.scale}>
      <group ref={interactionRef}>
        <FoldedMonolith config={config} mainRef={mainRef} layerRefs={layerRefs} />
        <GridLines config={config} />
      </group>
    </group>
  );
}
