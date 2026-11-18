# React Bits source used by Gary Visa

Retrieved 2026-11-16 from the official React Bits registry:

- https://reactbits.dev/r/Hyperspeed-TS-CSS.json
- https://github.com/DavidHDev/react-bits/tree/e8e0277a4e80540b38eb9e975dbd4c2b413905e5/src/ts-default/Backgrounds/Hyperspeed
- Exact Golden configuration: https://github.com/DavidHDev/react-bits/blob/e8e0277a4e80540b38eb9e975dbd4c2b413905e5/src/demo/Backgrounds/presets/Hyperspeed.js

The original React component, road geometry, lighting shaders, bloom, reflections, curve, steering and acceleration are retained. This is not a CSS approximation. The bundled dependency is `three@0.180.0`. The local license file reproduces the upstream MIT + Commons Clause license.

Gary Visa changes to `Hyperspeed.tsx`:

- Add `paused`, `onUnavailable` and first-frame `onReady` lifecycle props. Pause animation frames while offscreen, while the tab is hidden, or when the controller is paused.
- Cap renderer pixel ratio at 1 on mobile and 1.5 on larger screens; disable multisample antialiasing and request the low-power GPU preference. Geometry counts and requested Golden settings are unchanged.
- Budget rendering at 30 fps on smaller screens and 60 fps on larger screens, using elapsed time to retain the configured travel speed.
- Catch unavailable WebGL construction, handle lost contexts, and report to the static fallback controller without a retry loop.
- Explicitly release the WebGL context on teardown, in addition to upstream disposal of render targets, geometries, materials, event listeners and observers.
- Add optional `managedPlaybackInput` so Visa can distinguish taps from acceleration holds without the component's native immediate-boost handler also firing. Pointer steering, the Golden preset and visual shaders remain unchanged.
- Check paused/hidden state before resizing or scheduling successor frames. The paused renderer retains its scene/uniform state and resets only the wall-time baseline when waking, so paused time never advances the shader clock.

The small vanilla bootstrap reads the resolved preference before importing React, React DOM, Three or the Hyperspeed component. It imports/mounts only when enabled and visible. Off unmounts the React root; a static background remains in the original HTML. The poster remains until the first rendered frame is ready. Offscreen/hidden pause retains a single existing renderer to avoid creating a new context on every scroll. The React wrapper excludes controls from press-and-hold acceleration and never prevents scrolling or pointer defaults.

The host now budgets a single ten-second introduction starting at the first rendered frame, counting only enabled/visible playback. Manual pause/resume cancels that introduction budget; manual playback has no deadline. Theme/language changes do not reset it. Tap/hold classification, the accessible playback button and its transient indicator belong to the host integration rather than the Golden visual configuration.

The feedback island also adapts [React Bits Swipe Toast](https://reactbits.dev/micro/swipe-toast) and the [Counter](https://reactbits.dev/components/counter) maintained in Gary Home. The two source ports keep the downward swipe and pausable fuse, and the rolling digits with a static reduced-motion mode. They use the React Bits license included in this repository.
