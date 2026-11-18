import * as feedback from '../dist/action-toast.js';

// The portal fixtures evaluate ES module bodies in jsdom without loading their imports.
export function bindFeedbackDom(window) {
  Object.assign(window, feedback);
  const globals = {window, document: window.document};
  for (const name of ['getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame']) {
    if (window[name]) globals[name] = window[name].bind(window);
  }
  for (const name of ['IntersectionObserver', 'ResizeObserver']) globals[name] = window[name];
  const previous = new Map(Object.keys(globals).map(name => [name, Object.getOwnPropertyDescriptor(globalThis, name)]));
  Object.assign(globalThis, globals);
  const close = window.close.bind(window);
  window.close = () => {
    close();
    if (globalThis.window !== window) return;
    for (const [name, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else delete globalThis[name];
    }
  };
}
