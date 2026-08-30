"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

/**
 * Wrapper simples para o Sonner toaster.
 * Sem next-themes: tema segue o CSS (light/dark via .dark class).
 */
function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

export { Toaster };
