"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { GRID_COLORS } from "./gridConfig";
import {
  getLivingGridProgress,
  subscribeLivingGridPointer,
  subscribeLivingGridProgress,
} from "./motionStore";

const smoothstep = value => value * value * (3 - 2 * value);

function createLineField({ columns, rows, width, height, maskedAreas = [] }) {
  const positions = [];
  const colors = [];
  const left = -width / 2;
  const bottom = -height / 2;
  const cellWidth = width / columns;
  const cellHeight = height / rows;
  const background = new THREE.Color(GRID_COLORS.background);
  const line = new THREE.Color(GRID_COLORS.line);
  const chamberBounds = maskedAreas.map(chamber => ({
    left: left + chamber.column * cellWidth,
    right: left + (chamber.column + chamber.width) * cellWidth,
    top: height / 2 - chamber.row * cellHeight,
    bottom: height / 2 - (chamber.row + chamber.height) * cellHeight,
  }));

  const insideChamber = (x, y) => chamberBounds.some(bounds =>
    x > bounds.left + 0.001
    && x < bounds.right - 0.001
    && y > bounds.bottom + 0.001
    && y < bounds.top - 0.001
  );

  const lineStrength = (x, y) => {
    const edgeDistance = Math.max(Math.abs(x) / (width / 2), Math.abs(y) / (height / 2));
    const fade = Math.min(1, Math.max(0, (edgeDistance - 0.16) / 0.52));
    return 0.045 * (1 - smoothstep(fade));
  };

  const pushSegment = (from, to) => {
    positions.push(...from, ...to);
    background.clone().lerp(line, lineStrength(from[0], from[1])).toArray(colors, colors.length);
    background.clone().lerp(line, lineStrength(to[0], to[1])).toArray(colors, colors.length);
  };

  for (let column = 1; column < columns; column += 1) {
    const x = left + (column / columns) * width;
    for (let row = 0; row < rows; row += 1) {
      const y0 = bottom + row * cellHeight;
      const y1 = y0 + cellHeight;
      if (insideChamber(x, (y0 + y1) / 2)) continue;
      pushSegment([x, y0, 0], [x, y1, 0]);
    }
  }

  for (let row = 1; row < rows; row += 1) {
    const y = bottom + (row / rows) * height;
    for (let column = 0; column < columns; column += 1) {
      const x0 = left + column * cellWidth;
      const x1 = x0 + cellWidth;
      if (insideChamber((x0 + x1) / 2, y)) continue;
      pushSegment([x0, y, 0], [x1, y, 0]);
    }
  }

  return {
    positions: new Float32Array(positions),
    colors: new Float32Array(colors),
  };
}

export default function GridLines({ config }) {
  const field = useMemo(() => createLineField(config), [config]);
  const displayPositions = useMemo(() => field.positions.slice(), [field]);
  const positionRef = useRef(null);
  const materialRef = useRef(null);
  const { invalidate } = useThree();

  useEffect(() => {
    const pointer = { x: 0, y: 0, strength: 0 };

    const renderDistortion = () => {
      const attribute = positionRef.current;
      if (!attribute) return;
      const positions = attribute.array;
      const worldX = pointer.x * config.width * 0.5;
      const worldY = pointer.y * config.height * 0.5;
      const radius = Math.min(config.width / config.columns, config.height / config.rows) * 2.6;
      const amount = Math.min(config.width / config.columns, config.height / config.rows) * 0.09;

      for (let index = 0; index < field.positions.length; index += 3) {
        const originX = field.positions[index];
        const originY = field.positions[index + 1];
        const deltaX = originX - worldX;
        const deltaY = originY - worldY;
        const distance = Math.hypot(deltaX, deltaY);
        const influence = distance < radius
          ? (1 - distance / radius) ** 2 * pointer.strength
          : 0;
        const inverseDistance = distance > 0.0001 ? 1 / distance : 0;

        positions[index] = originX + deltaX * inverseDistance * amount * influence;
        positions[index + 1] = originY + deltaY * inverseDistance * amount * influence;
        positions[index + 2] = field.positions[index + 2];
      }

      attribute.needsUpdate = true;
      invalidate();
    };

    const unsubscribePointer = subscribeLivingGridPointer(nextPointer => {
      const active = nextPointer.active && getLivingGridProgress() > 0.78;
      gsap.to(pointer, {
        x: nextPointer.x,
        y: nextPointer.y,
        strength: active ? 1 : 0,
        duration: 0.55,
        ease: "power3.out",
        overwrite: true,
        onUpdate: renderDistortion,
      });
    });

    const unsubscribeProgress = subscribeLivingGridProgress(progress => {
      if (materialRef.current) {
        materialRef.current.opacity = 0.28 + progress * 0.72;
      }
      if (progress < 0.78 && pointer.strength > 0) {
        gsap.to(pointer, {
          strength: 0,
          duration: 0.3,
          overwrite: "auto",
          onUpdate: renderDistortion,
        });
      }
      invalidate();
    });

    return () => {
      unsubscribePointer();
      unsubscribeProgress();
      gsap.killTweensOf(pointer);
    };
  }, [config, field, invalidate]);

  return (
    <lineSegments position={[0, 0, 0.018]} renderOrder={1}>
      <bufferGeometry>
        <bufferAttribute ref={positionRef} attach="attributes-position" args={[displayPositions, 3]} />
        <bufferAttribute attach="attributes-color" args={[field.colors, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        ref={materialRef}
        vertexColors
        transparent
        opacity={0.28}
        depthTest
        depthWrite={false}
      />
    </lineSegments>
  );
}
