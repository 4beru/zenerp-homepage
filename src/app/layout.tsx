import type { Viewport, Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteName = "Zen ERP";
const siteDescription =
  "Desarrollamos aplicaciones web, mobile y desktop e implementamos sistemas de gestión (ERP) como Odoo y ERPNext, adaptados a tu negocio. Simple, sin complicaciones.";

export const metadata: Metadata = {
  title: `${siteName} — Software a medida y sistemas de gestión (ERP)`,
  description: siteDescription,
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
  authors: [{ name: "Zen ERP" }],
  icons: {
    icon: [{ url: "/zen-logo.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: `${siteName} — Software simple, hecho a tu medida`,
    description: siteDescription,
    siteName,
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Software simple, hecho a tu medida`,
    description: siteDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/** Datos estructurados (Organization) para motores de búsqueda. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteDescription,
  email: siteConfig.email,
  areaServed: "Argentina",
  knowsAbout: [
    "Odoo",
    "ERPNext",
    "Desarrollo de software a medida",
    "Aplicaciones web y mobile",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
