export const GRID_COLORS = {
  background: "#ffffff",
  line: "#171717",
  block: "#070707",
};

export const DESKTOP_GRID = {
  columns: 24,
  rows: 14,
  width: 14.4,
  height: 8.4,
  camera: { fov: 30, position: [0.16, 0.12, 19.7] },
  rotation: [-0.032, -0.082, 0],
  position: [0.42, -0.08, 0],
  scale: [0.94, 0.94, 0.94],
  monolith: {
    depth: 0.82,
    // One continuous folded band. Points use editorial-grid coordinates.
    outline: [
      [3, 11], [3, 3], [7, 3], [7, 2], [12, 2], [12, 3],
      [19, 3], [19, 9], [22, 9], [22, 10.25], [11, 10.25], [11, 9],
      [17, 9], [17, 4.5], [5, 4.5], [5, 11],
    ],
    chamber: { column: 11, row: 4.5, width: 6, height: 4.5 },
  },
  structuralLayers: [
    { column: 3, row: 3, width: 2, height: 8, depth: 1.38, role: "spine" },
    { column: 7, row: 2, width: 5, height: 1, depth: 1.08, role: "shoulder", rotation: [-0.11, 0, 0] },
    { column: 12, row: 3, width: 5, height: 1, depth: 0.98, role: "bridge" },
    { column: 17, row: 3, width: 2, height: 6, depth: 1.48, role: "return-wall" },
    { column: 8, row: 9, width: 6, height: 0.72, depth: 0.82, role: "threshold" },
    { column: 14, row: 9, width: 5, height: 0.78, depth: 1.02, role: "chamber-floor" },
    { column: 19, row: 9, width: 3, height: 1.25, depth: 0.72, role: "platform", rotation: [0.075, 0, 0] },
  ],
  maskedAreas: [
    { column: 11, row: 4.5, width: 6, height: 4.5 },
  ],
};

export const MOBILE_GRID = {
  columns: 10,
  rows: 14,
  width: 5,
  height: 7,
  camera: { fov: 39, position: [0.1, 0.12, 12.4] },
  rotation: [-0.025, -0.045, 0],
  position: [0, 0.1, 0],
  scale: [1, 1, 1],
  monolith: {
    depth: 0.56,
    outline: [
      [1, 11], [1, 3], [2, 3], [2, 2], [5, 2], [5, 3],
      [8, 3], [8, 9], [9, 9], [9, 11], [5, 11], [5, 9],
      [7, 9], [7, 5], [3, 5], [3, 11],
    ],
    chamber: { column: 5, row: 5, width: 2, height: 4 },
  },
  structuralLayers: [
    { column: 1, row: 3, width: 2, height: 7, depth: 0.82, role: "spine" },
    { column: 2, row: 2, width: 3, height: 2, depth: 0.7, role: "shoulder", rotation: [-0.08, 0, 0] },
    { column: 5, row: 2, width: 2, height: 2, depth: 0.64, role: "bridge" },
    { column: 7, row: 3, width: 1, height: 6, depth: 0.88, role: "return-wall" },
    { column: 6, row: 9, width: 2, height: 2, depth: 0.7, role: "chamber-floor" },
    { column: 8, row: 9, width: 1, height: 2, depth: 0.48, role: "platform", rotation: [0.06, 0, 0] },
  ],
  maskedAreas: [
    { column: 5, row: 5, width: 2, height: 4 },
  ],
};
