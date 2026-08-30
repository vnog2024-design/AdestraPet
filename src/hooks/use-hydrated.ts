"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns false during SSR, true after hydration on the client.
 * Uses useSyncExternalStore so it doesn't trigger React 19's
 * "set-state-in-effect" lint rule.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
