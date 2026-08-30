import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Hook SSR-safe para detectar viewport mobile.
 * Usa useSyncExternalStore para evitar o lint rule "set-state-in-effect".
 */
export function useIsMobile(): boolean {
  const subscribe = React.useCallback((onChange: () => void) => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const getSnapshot = React.useCallback(
    () => window.innerWidth < MOBILE_BREAKPOINT,
    []
  );

  // SSR fallback (server sempre retorna false para evitar flash mobile).
  const getServerSnapshot = React.useCallback(() => false, []);

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
