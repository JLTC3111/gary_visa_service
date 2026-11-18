"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(notify: () => void) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return () => {};
  const media = window.matchMedia(query);
  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", notify);
    return () => media.removeEventListener("change", notify);
  }
  if (typeof media.addListener === "function") {
    media.addListener(notify);
    return () => media.removeListener(notify);
  }
  return () => {};
}

function snapshot() {
  return typeof window === "undefined" || typeof window.matchMedia !== "function" || window.matchMedia(query).matches;
}

// Motion's hook currently snapshots the initial preference. Subscribe directly
// so a preference change also cancels our reveals, springs and layout motion.
export function useMotionPreference() {
  return useSyncExternalStore(subscribe, snapshot, () => true);
}
