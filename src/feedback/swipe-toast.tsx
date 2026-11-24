"use client";

// Adapted from React Bits Swipe Toast (David Haz, MIT + Commons Clause).
// https://reactbits.dev/micro/swipe-toast
import { isValidElement, useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";

export type ToastTone = "success" | "error" | "warning" | "info";

type Props = {
  children: ReactNode;
  dismiss: () => void;
  tone?: ToastTone;
  language?: string;
  duration?: number;
  closeButton?: boolean;
  action?: { label: string; run: () => void };
  returnFocus?: () => void;
  toastId?: number;
  publication?: boolean;
};

type Sample = { time: number; y: number };
const swipeDistance = 40;
const flickVelocity = 0.11;
const rubberband = (offset: number) => (offset * 24 * 0.55) / (24 + 0.55 * Math.abs(offset));
const toneMark = { success: "✓", warning: "!", error: "×", info: "i" };

function textLength(node: ReactNode): number {
  if (typeof node === "string" || typeof node === "number") return String(node).length;
  if (Array.isArray(node)) return node.reduce((length, child) => length + textLength(child), 0);
  return isValidElement<{ children?: ReactNode }>(node) ? textLength(node.props.children) : 0;
}

export function SwipeToast({
  children, dismiss, tone = "success", language = "en", duration: durationOverride,
  closeButton = true, action, returnFocus, toastId, publication
}: Props) {
  const [readingDuration] = useState(() => 4500 + Math.min(3500, Math.max(0, textLength(children) - 120) * 22));
  const duration = durationOverride ?? readingDuration;
  const fuseId = `toast-fuse-${useId().replace(/[^a-z0-9_-]/gi, "")}`;
  const card = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const drag = useRef<{ id: number; start: number; samples: Sample[] } | null>(null);
  const remaining = useRef(duration);
  const countdownDuration = useRef(duration);
  const latestDismiss = useRef(dismiss);
  const exit = useRef<Animation | undefined>(undefined);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [hidden, setHidden] = useState(false);
  const paused = hovered || focused || dragging || hidden;
  const vi = language === "vi";

  useEffect(() => { latestDismiss.current = dismiss; }, [dismiss]);
  useEffect(() => {
    const doc = card.current?.ownerDocument;
    if (!doc) return;
    const visibility = () => setHidden(doc.hidden);
    visibility();
    doc.addEventListener("visibilitychange", visibility);
    return () => {
      doc.removeEventListener("visibilitychange", visibility);
      exit.current?.cancel();
    };
  }, []);
  useEffect(() => {
    if (countdownDuration.current !== duration) {
      countdownDuration.current = duration;
      remaining.current = duration;
    }
    const win = card.current?.ownerDocument.defaultView;
    if (!win || duration <= 0 || paused) return;
    const start = win.performance.now();
    const timer = win.setTimeout(() => slideOut(0), remaining.current);
    return () => {
      win.clearTimeout(timer);
      remaining.current = Math.max(0, remaining.current - (win.performance.now() - start));
    };
  }, [duration, paused]);

  function close() {
    exit.current?.cancel();
    const node = card.current;
    if (node?.contains(node.ownerDocument.activeElement)) {
      const previous = opener.current;
      if (previous?.isConnected && !previous.closest("[hidden], [inert], dialog:not([open])")) {
        previous.focus({ preventScroll: true });
      } else {
        returnFocus?.();
      }
    }
    latestDismiss.current();
  }

  function slideOut(offset: number) {
    if (exit.current) return;
    const node = card.current;
    const reduce = node?.ownerDocument.defaultView?.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!node || reduce || typeof node.animate !== "function") { close(); return; }
    exit.current = node.animate([
      { transform: `translateY(${offset}px)`, opacity: 1 },
      { transform: `translateY(${offset + (offset ? node.offsetHeight : 8)}px)`, opacity: 0 }
    ], { duration: 160, easing: "ease-out", fill: "forwards" });
    exit.current.finished.then(close, () => {});
  }

  function startSwipe(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || drag.current || exit.current || (event.target as Element).closest("button, a")) return;
    drag.current = { id: event.pointerId, start: event.clientY, samples: [{ time: event.timeStamp, y: 0 }] };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setDragging(true);
  }

  function moveSwipe(event: PointerEvent<HTMLDivElement>) {
    const gesture = drag.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    const y = event.clientY - gesture.start;
    if (Math.abs(y) < 3 && gesture.samples.length === 1) return;
    gesture.samples.push({ time: event.timeStamp, y });
    if (gesture.samples.length > 4) gesture.samples.shift();
    const node = event.currentTarget;
    node.dataset.swiping = "";
    node.style.setProperty("--toast-offset", `${y < 0 ? rubberband(y) : y}px`);
  }

  function finishSwipe(event: PointerEvent<HTMLDivElement>, cancelled = false) {
    const gesture = drag.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    drag.current = null;
    const node = event.currentTarget;
    delete node.dataset.swiping;
    if (node.hasPointerCapture?.(event.pointerId)) node.releasePointerCapture(event.pointerId);
    const y = event.clientY - gesture.start;
    const first = gesture.samples[0], last = gesture.samples.at(-1)!;
    const velocity = event.timeStamp - last.time > 100 ? 0 : (last.y - first.y) / Math.max(1, last.time - first.time);
    if (!cancelled && (y >= swipeDistance || (y > 12 && velocity > flickVelocity))) {
      slideOut(y);
      return;
    }
    node.style.removeProperty("--toast-offset");
    setDragging(false);
  }

  return <div
    ref={card}
    className="action-toast"
    data-tone={tone}
    data-toast-id={toastId}
    data-cms-success={publication ? "" : undefined}
    lang={language}
    tabIndex={closeButton ? undefined : 0}
    onPointerDown={startSwipe}
    onPointerMove={moveSwipe}
    onPointerUp={finishSwipe}
    onPointerCancel={event => finishSwipe(event, true)}
    onLostPointerCapture={event => finishSwipe(event, true)}
    onPointerEnter={event => { if (event.pointerType !== "touch") setHovered(true); }}
    onPointerLeave={() => setHovered(false)}
    onFocusCapture={event => {
      const previous = event.relatedTarget;
      if (previous && !event.currentTarget.contains(previous)) opener.current = previous as HTMLElement;
      setFocused(true);
    }}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    onKeyDown={event => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      close();
    }}>
    <span className="action-toast-mark" aria-hidden="true">{toneMark[tone]}</span>
    <div className="action-toast-content" role={tone === "error" ? "alert" : "status"} aria-atomic="true">{children}</div>
    {action && <button type="button" className="action-toast-undo" onClick={() => { close(); action.run(); }}>{action.label}</button>}
    {closeButton && <button type="button" data-success-close onClick={close}>{vi ? "Đóng" : "Dismiss"}</button>}
    {duration > 0 && <svg key={duration} aria-hidden="true" className="action-toast-fuse" data-paused={paused || undefined}
      viewBox="0 0 360 12" preserveAspectRatio="none" style={{ "--toast-duration": `${duration}ms` } as CSSProperties}>
      <defs><linearGradient id={fuseId}><stop offset="0%"/><stop offset="50%"/><stop offset="100%"/></linearGradient></defs>
      <path d="M2 2 Q3 10 12 10 H348 Q357 10 358 2" pathLength={1} fill="none" stroke={`url(#${fuseId})`}
        strokeWidth={2} strokeLinecap="round" vectorEffect="non-scaling-stroke"/>
    </svg>}
  </div>;
}
