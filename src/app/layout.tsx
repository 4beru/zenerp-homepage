import type { Viewport, Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/**
 * Favicon e ícono apple servidos desde /public (logo.svg y og.png).
 * metadataIcons está deprecado en Next 16; usamos icons[] en metadata.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
  title: {
    default: `${siteConfig.name} — Software a medida y sistemas de gestión (ERP)`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "desarrollo de software a medida",
    "implementación Odoo",
    "implementación ERPNext",
    "aplicaciones web",
    "apps mobile",
    "apps desktop",
    "ERP para pymes",
    "Argentina",
  ],
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Software simple, hecho a tu medida`,
    description: siteConfig.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `Zen ERP — flor de loto sobre fondo oscuro con el texto "Software simple, hecho a tu medida"`,
      },
    ],
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Software simple, hecho a tu medida`,
    description: siteConfig.description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
