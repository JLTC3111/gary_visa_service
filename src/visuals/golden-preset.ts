import type { HyperspeedProps } from './react-bits/Hyperspeed';

// Exact Golden swatches exported by React Bits, not sampled from a screenshot.
export const garyVisaGolden: HyperspeedProps = {
  curve: 'gentle', curvature: 1, speed: 1, boost: 3,
  fov: 90, boostFov: 130, lanes: 3, roadWidth: 9, medianWidth: 2,
  density: 30, trailLength: 1, lightSize: 1, poles: 50, dust: 100,
  glow: 0.6, reflections: 0.5, roadOpacity: 0.1, steer: 0.35,
  roadColor: '#08080a', lineColor: '#25252d',
  tailColors: ['#7d0d1b', '#a90519', '#ff102a'],
  headColors: ['#f1eece', '#e6e2b1', '#dfd98a'],
  poleColors: ['#f1eece'],
  background: 'transparent', theme: 'dark', interactive: true
};

export const garyVisaDaylight: HyperspeedProps = {
  ...garyVisaGolden,
  theme: 'light',
  background: '#edf6ff',
  roadColor: '#a6c5e7',
  roadOpacity: 0.66,
  lineColor: '#537faf',
  fogNear: 64,
  fogFar: 310,
  tailColors: ['#1249d7', '#245cfc', '#3c77d5'],
  headColors: ['#057991', '#008bae', '#00a7c8'],
  poleColors: ['#197ca9'],
  dustColor: '#648ec0',
  glow: 0.26,
  reflections: 0.22
};
