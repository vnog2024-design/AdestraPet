import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ServiceWorkerRegister } from "@/components/sw-register";
import { PRODUCT } from "@/config/product";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = PRODUCT.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${PRODUCT.name} — ${PRODUCT.tagline}`,
    template: `%s • ${PRODUCT.name}`,
  },
  description: PRODUCT.description,
  applicationName: PRODUCT.name,
  keywords: [
    "adestramento de cães",
    "treinar cachorro",
    "comandos para cães",
    "obediência canina",
    "reforço positivo",
    "treino de filhotes",
    "adestrar cachorro em casa",
    "aplicativo de adestramento",
    PRODUCT.name,
  ],
  authors: [{ name: PRODUCT.name }],
  creator: PRODUCT.name,
  publisher: PRODUCT.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: PRODUCT.name,
    title: `${PRODUCT.name} — ${PRODUCT.tagline}`,
    description: PRODUCT.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${PRODUCT.name} — ${PRODUCT.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PRODUCT.name} — ${PRODUCT.tagline}`,
    description: PRODUCT.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  // Metadados extras para PWA/TWA — permitem modo standalone no Android
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": PRODUCT.name,
    "mobile-web-app-capable": "yes",
    "format-detection": "telephone=no",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdf6e3" },
    { media: "(prefers-color-scheme: dark)", color: "#2a1f12" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  // Crítico para TWA/PWA no Android — permite modo standalone
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <SonnerToaster position="top-center" richColors />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
