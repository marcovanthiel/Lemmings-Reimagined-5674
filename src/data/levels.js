export const levels = [
  {
    id: 1,
    name: "Basic Training",
    lemmingCount: 5,
    requiredSaved: 3,
    spawnPoint: { x: 50, y: 50 },
    terrain: [
      { x: 0, y: 550, width: 800, height: 50 },
      { x: 200, y: 400, width: 200, height: 20 },
    ],
    obstacles: [],
  },
  {
    id: 2,
    name: "Bridge Builder",
    lemmingCount: 8,
    requiredSaved: 5,
    spawnPoint: { x: 50, y: 50 },
    terrain: [
      { x: 0, y: 550, width: 300, height: 50 },
      { x: 500, y: 550, width: 300, height: 50 },
    ],
    obstacles: [
      { x: 300, y: 550, width: 200, height: 50, type: 'gap' },
    ],
  },
  {
    id: 3,
    name: "Mountain Climb",
    lemmingCount: 10,
    requiredSaved: 6,
    spawnPoint: { x: 50, y: 50 },
    terrain: [
      { x: 0, y: 550, width: 800, height: 50 },
      { x: 300, y: 450, width: 200, height: 100 },
      { x: 400, y: 350, width: 200, height: 200 },
    ],
    obstacles: [
      { x: 200, y: 300, width: 50, height: 250, type: 'spikes' },
    ],
  },
  {
    id: 4,
    name: "Cave Explorer",
    lemmingCount: 12,
    requiredSaved: 7,
    spawnPoint: { x: 50, y: 50 },
    terrain: [
      { x: 0, y: 550, width: 800, height: 50 },
      { x: 100, y: 300, width: 600, height: 20 },
      { x: 200, y: 200, width: 400, height: 20 },
    ],
    obstacles: [
      { x: 350, y: 220, width: 100, height: 80, type: 'water' },
    ],
  },
  {
    id: 5,
    name: "Lava Fields",
    lemmingCount: 10,
    requiredSaved: 8,
    spawnPoint: { x: 50, y: 50 },
    terrain: [
      { x: 0, y: 550, width: 800, height: 50 },
      { x: 200, y: 400, width: 150, height: 20 },
      { x: 450, y: 400, width: 150, height: 20 },
    ],
    obstacles: [
      { x: 350, y: 400, width: 100, height: 150, type: 'lava' },
    ],
  },
  {
    id: 6,
    name: "Ice Path",
    lemmingCount: 12,
    requiredSaved: 8,
    spawnPoint: { x: 50, y: 50 },
    terrain: [
      { x: 0, y: 550, width: 800, height: 50 },
      { x: 200, y: 400, width: 400, height: 20 },
    ],
    obstacles: [
      { x: 300, y: 420, width: 200, height: 20, type: 'ice' },
    ],
  },
  {
    id: 7,
    name: "Wind Tunnel",
    lemmingCount: 12,
    requiredSaved: 9,
    spawnPoint: { x: 50, y: 50 },
    terrain: [
      { x: 0, y: 550, width: 800, height: 50 },
      { x: 200, y: 350, width: 100, height: 20 },
      { x: 500, y: 350, width: 100, height: 20 },
    ],
    obstacles: [
      { x: 300, y: 300, width: 200, height: 50, type: 'wind' },
    ],
  },
  {
    id: 8,
    name: "Factory Floor",
    lemmingCount: 15,
    requiredSaved: 10,
    spawnPoint: { x: 50, y: 50 },
    terrain: [
      { x: 0, y: 550, width: 800, height: 50 },
      { x: 200, y: 400, width: 100, height: 20 },
      { x: 400, y: 300, width: 100, height: 20 },
    ],
    obstacles: [
      { x: 300, y: 350, width: 50, height: 200, type: 'crusher' },
    ],
  },
  {
    id: 9,
    name: "Maze Runner",
    lemmingCount: 15,
    requiredSaved: 10,
    spawnPoint: { x: 50, y: 50 },
    terrain: [
      { x: 0, y: 550, width: 800, height: 50 },
      { x: 100, y: 400, width: 600, height: 20 },
      { x: 200, y: 250, width: 400, height: 20 },
    ],
    obstacles: [
      { x: 300, y: 270, width: 50, height: 130, type: 'teleporter' },
    ],
  },
  {
    id: 10,
    name: "Final Challenge",
    lemmingCount: 15,
    requiredSaved: 12,
    spawnPoint: { x: 50, y: 50 },
    terrain: [
      { x: 0, y: 550, width: 800, height: 50 },
      { x: 200, y: 400, width: 100, height: 20 },
      { x: 400, y: 300, width: 100, height: 20 },
      { x: 600, y: 200, width: 100, height: 20 },
    ],
    obstacles: [
      { x: 300, y: 200, width: 50, height: 350, type: 'lava' },
      { x: 500, y: 300, width: 50, height: 250, type: 'spikes' },
    ],
  },
];