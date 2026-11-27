import React, { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import Hyperspeed from './react-bits/Hyperspeed';
import { garyVisaDaylight, garyVisaGolden } from './golden-preset';
import { attachPlaybackGestures } from './playback-gestures';

type Theme = 'light' | 'dark';
type Props = { hero: HTMLElement; theme: Theme; paused: boolean; onToggle: () => void; onUnavailable: () => void; onReady: () => void };

class WebGLBoundary extends Component<{ onUnavailable: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onUnavailable(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function Scene({ hero, theme, paused, onToggle, onUnavailable, onReady }: Props) {
  const [boosting, setBoosting] = useState(false);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const gestures = useRef<ReturnType<typeof attachPlaybackGestures> | null>(null);
  useEffect(() => {
    gestures.current = attachPlaybackGestures({ hero, onToggle, onBoost: setBoosting, isPaused: () => pausedRef.current });
    const move = (event: PointerEvent) => {
      const surface = hero.querySelector('.hyperspeed');
      if (!surface || surface.contains(event.target as Node)) return;
      surface.dispatchEvent(new PointerEvent('pointermove', {
        clientX: event.clientX, clientY: event.clientY, pointerType: event.pointerType
      }));
    };
    hero.addEventListener('pointermove', move);
    return () => {
      gestures.current?.destroy();
      gestures.current = null;
      hero.removeEventListener('pointermove', move);
    };
  }, [hero, onToggle]);
  useEffect(() => { if (paused) gestures.current?.cancel(); }, [paused]);
  const preset = theme === 'light' ? garyVisaDaylight : garyVisaGolden;
  return <Hyperspeed {...preset} managedPlaybackInput paused={paused} boosting={boosting && !paused} onUnavailable={onUnavailable} onReady={onReady} />;
}

export function mountHyperspeed(host: HTMLElement, hero: HTMLElement, options: {
  onUnavailable: () => void;
  onReady: () => void;
  onToggle?: () => void;
  theme?: Theme;
}) {
  const { onUnavailable, onReady, onToggle = () => {} } = options;
  let theme = options.theme ?? 'dark';
  const root = createRoot(host);
  let unmounted = false;
  let paused = false;
  const render = () => root.render(
    <WebGLBoundary onUnavailable={onUnavailable}>
      <Scene hero={hero} theme={theme} paused={paused} onToggle={onToggle} onUnavailable={onUnavailable} onReady={onReady} />
    </WebGLBoundary>
  );
  render();
  return {
    setTheme(next: Theme) {
      if (unmounted || theme === next) return;
      theme = next;
      render();
    },
    setPaused(next: boolean) {
      if (unmounted || paused === next) return;
      paused = next;
      render();
    },
    unmount() {
      if (unmounted) return;
      unmounted = true;
      root.unmount();
      host.replaceChildren();
    }
  };
}
