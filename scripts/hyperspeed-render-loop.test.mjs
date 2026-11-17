import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { transform } from 'esbuild';

// Execute the component's actual scheduling/render/clock closures. Three's
// objects are CPU doubles: these tests prove loop suspension, not GPU drivers.
const original = await readFile(new URL('../src/visuals/react-bits/Hyperspeed.tsx', import.meta.url), 'utf8');
const { code } = await transform(original, { loader: 'tsx', format: 'esm' });
function between(start, end) {
  const a = code.indexOf(start), b = code.indexOf(end, a);
  assert.ok(a >= 0 && b > a, `renderer closure ${start} must remain available`);
  return code.slice(a, b);
}
const closures = [
  between('const frame =', 'const wake ='),
  between('const wake =', 'const setHeld ='),
  between('const setHeld =', 'const onMove ='),
  between('const onMenu =', 'const onAnimationState ='),
  between('const onAnimationState =', 'const onContextLost =')
].join('\n');
const cleanup = code.match(/return \(\) => \{\n      alive = false;[\s\S]*?\n    \};/)?.[0].replace('return () =>', 'const cleanup = () =>');
assert.ok(cleanup, 'actual renderer disposal closure must remain available');

function scene({ managed = false, firstFrame } = {}) {
  let clock = 0, next = 0;
  const queue = new Map();
  const counts = { render: 0, resize: 0, ready: 0, dispose: 0, loseContext: 0, removeCanvas: 0, disconnect: 0, materials: 0, boostStart: 0, boostEnd: 0 };
  const vector = () => ({ set() { return this; }, add() { return this; } });
  const uniforms = () => new Proxy({}, { get(target, key) { return target[key] ??= { value: key === 'uCurveA' ? vector() : 0 }; } });
  const group = () => ({ geometry: {}, uniforms: uniforms(), core: { uniforms: uniforms() }, reflection: { uniforms: uniforms() } });
  const settings = {
    paused: false, managedPlaybackInput: managed, interactive: true, boosting: false,
    speed: 1, boost: 3, fov: 90, boostFov: 130, curvature: 1, curve: 'gentle',
    roadWidth: 9, medianWidth: 2, roadOpacity: .1, density: 30, lanes: 3,
    trailLength: 1, lightSize: 1, poles: 50, poleHeight: 1, dust: 100,
    glow: .6, reflections: .5, steer: .35, light: false
  };
  const shared = uniforms();
  const events = { removeEventListener() {} };
  const context = {
    counts, settingsRef: { current: settings }, shared,
    state: { held: false, boost: 0, boosted: false, fov: 90, fovVelocity: 0, steerX: 0, steerY: 0, pointerX: 0, pointerY: 0, visible: true, weights: [0, 0, 0, 0, 0] },
    performance: { now: () => clock },
    requestAnimationFrame(fn) { const id = ++next; queue.set(id, fn); return id; },
    cancelAnimationFrame(id) { queue.delete(id); },
    document: { ...events, hidden: false }, window: events, container: events,
    syncColors() {}, applyResize() { counts.resize++; },
    callbacksRef: { current: {
      onReady() { counts.ready++; firstFrame?.(settings); },
      onBoostStart() { counts.boostStart++; }, onBoostEnd() { counts.boostEnd++; }
    } },
    CURVES: ['straight', 'gentle', 'winding', 'hills', 'racing', 'deep'],
    tail: group(), head: group(), poleGeometry: {}, poleUniforms: uniforms(), polesLayers: group(),
    dustGeometry: { setDrawRange() {} }, dustUniforms: uniforms(), roadUniforms: uniforms(), roadMaterial: {},
    camera: { position: vector(), updateProjectionMatrix() {}, lookAt() {}, layers: { set() {} } },
    lookTarget: vector(), lookShapes() { return Array.from({ length: 5 }, () => [0, 0, -1]); },
    renderer: { domElement: { height: 900, ...events, remove() { counts.removeCanvas++; } }, setRenderTarget() {}, setClearColor() {}, clear() {}, render() { counts.render++; }, dispose() { counts.dispose++; }, forceContextLoss() { counts.loseContext++; } },
    scene: {}, clearColor: {}, clearAlpha: 0,
    levels: Array.from({ length: 4 }, () => ({ height: 450 })),
    downMaterial: {}, upMaterial: {}, bloomMaterial: { uniforms: uniforms() }, pass() { counts.render++; },
    resizeObserver: { disconnect() { counts.disconnect++; } }, visibility: { disconnect() { counts.disconnect++; } },
    disposables: Array.from({ length: 3 }, () => ({ dispose() { counts.materials++; } })),
    resize() {}, onMove() {}, onLeave() {}, onContextLost() {}
  };
  vm.runInNewContext(`let raf=0,last=performance.now(),frameBudget=1000/60,alive=true,firstFrame=true,resizePending=false; const reduce=false; ${closures}\n${cleanup}\nglobalThis.api={wake,frame,onDown,onUp,onMenu,cleanup,pause(value){settingsRef.current.paused=value;onAnimationState();},hidden(value){document.hidden=value;onAnimationState();},visible(value){state.visible=value;onAnimationState();},resize(){resizePending=true;wake();}};`, context);
  return {
    ...context.api, counts, settings, shared, state: context.state,
    pending: () => queue.size,
    advance(ms) { clock += ms; const tasks = [...queue.values()]; queue.clear(); tasks.forEach(fn => fn(clock)); },
    wallTime(ms) { clock += ms; },
    raceFrame() { context.api.frame(clock); }
  };
}

test('actual paused renderer cancels RAF, performs no render/resize, and resumes without advancing the paused clock', () => {
  const s = scene();
  s.wake(); s.wake(); assert.equal(s.pending(), 1, 'only one frame may be scheduled');
  s.advance(20); assert.equal(s.shared.uTime.value, .02);
  const renders = s.counts.render;
  s.pause(true); assert.equal(s.pending(), 0);
  s.resize(); s.wallTime(60_000); s.raceFrame();
  assert.equal(s.counts.render, renders);
  assert.equal(s.counts.resize, 0, 'a canceled/stale callback must not resize GPU targets while paused');
  assert.equal(s.shared.uTime.value, .02);
  s.pause(false); s.wake(); assert.equal(s.pending(), 1);
  s.advance(20);
  assert.equal(s.counts.resize, 1);
  assert.equal(s.shared.uTime.value, .04, 'paused wall time is excluded from shader time');
  assert.equal(s.counts.ready, 1, 'resume keeps the existing scene');
  s.cleanup();
});

test('actual page/viewport suspension cancels frames and a pause during first-frame readiness cannot schedule a successor', () => {
  const s = scene(); s.wake(); s.advance(20);
  s.hidden(true); assert.equal(s.pending(), 0);
  s.advance(1_000); assert.equal(s.shared.uTime.value, .02);
  s.hidden(false); s.visible(false); assert.equal(s.pending(), 0);
  s.advance(1_000); assert.equal(s.shared.uTime.value, .02);
  s.visible(true); s.advance(20); assert.equal(s.shared.uTime.value, .04); s.cleanup();
  const pausedOnReady = scene({ firstFrame: settings => settings.paused = true });
  pausedOnReady.wake(); pausedOnReady.advance(20);
  assert.equal(pausedOnReady.pending(), 0);
  assert.equal(pausedOnReady.shared.uTime.value, .02); pausedOnReady.cleanup();
});

test('actual frame budget skips GPU work without advancing time and cleanup releases the pending loop and WebGL resources', () => {
  const s = scene(); s.wake(); s.advance(5);
  assert.equal(s.counts.render, 0); assert.equal(s.shared.uTime.value, 0); assert.equal(s.pending(), 1);
  s.advance(15); assert.ok(s.counts.render > 0); assert.equal(s.shared.uTime.value, .02);
  s.cleanup(); assert.equal(s.pending(), 0);
  s.wake(); s.advance(1_000);
  assert.equal(s.shared.uTime.value, .02);
  assert.equal(s.counts.dispose, 1); assert.equal(s.counts.loseContext, 1); assert.equal(s.counts.removeCanvas, 1);
  assert.equal(s.counts.disconnect, 2); assert.equal(s.counts.materials, 3);
});

test('managed input leaves tap/hold arbitration to the host without disabling steering/boost configuration', () => {
  const managed = scene({ managed: true });
  let prevented = 0;
  managed.onDown({ button: 0, pointerType: 'mouse' });
  managed.onMenu({ preventDefault() { prevented++; } });
  assert.equal(managed.state.held, false); assert.equal(managed.counts.boostStart, 0); assert.equal(prevented, 0);
  managed.settings.boosting = true; managed.wake(); managed.advance(20);
  assert.ok(managed.state.boost > 0); assert.ok(managed.shared.uTime.value > .02);
  assert.equal(managed.settings.interactive, true); assert.equal(managed.settings.steer, .35); managed.cleanup();
  const legacy = scene();
  legacy.onDown({ button: 0, pointerType: 'mouse' }); legacy.onMenu({ preventDefault() { prevented++; } });
  assert.equal(legacy.state.held, true); assert.equal(legacy.counts.boostStart, 1); assert.equal(prevented, 1);
  legacy.onUp(); assert.equal(legacy.state.held, false); assert.equal(legacy.counts.boostEnd, 1); legacy.cleanup();
});
