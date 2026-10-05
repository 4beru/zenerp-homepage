import type { Viewport, Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { MotionProvider } from "@/components/zen/motion-provider";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const siteName = "Zen ERP";
const siteDescription =
  "We develop custom web, mobile, and desktop applications and implement management systems (ERP) like Odoo and ERPNext, tailored to your business operations. Calm, precise, reliable.";

const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Zen ERP — Calm software, built to your measure. Lotus emblem on dark canvas with terracotta accents.",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteName} — Bespoke Software & Business Management Systems (ERP)`,
  description: siteDescription,
  keywords: [
    "custom software development",
    "Odoo implementation",
    "ERPNext implementation",
    "enterprise web applications",
    "mobile apps",
    "desktop systems",
    "ERP for businesses",
    "Buenos Aires",
    "Global",
  ],
  authors: [{ name: "Zen ERP" }],
  manifest: "/manifest.webmanifest",
  applicationName: siteName,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteName,
  },
  icons: {
    icon: [
      { url: "/zen-logo.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: `${siteName} — Calm software, built to your measure`,
    description: siteDescription,
    siteName,
    type: "website",
    locale: "en_US",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Calm software, built to your measure`,
    description: siteDescription,
    images: [ogImage.url],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/** Structured data (Organization) for search engines. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteDescription,
  email: siteConfig.email,
  areaServed: "Global",
  knowsAbout: [
    "Odoo",
    "ERPNext",
    "Custom Software Engineering",
    "Web and Mobile Applications",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.email,
      areaServed: "Global",
      availableLanguage: ["en", "es"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=zodiak@400,400i,600,600i&display=swap"
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Accessibility: first focusable element */}
        <a
          href="#inicio"
          className="skip-link rounded-full bg-zen-accent px-5 py-2.5 text-sm font-semibold text-[#1a1210] shadow-lg outline-none print:hidden"
        >
          Skip to content
        </a>
        {/* Sin JS: las secciones con Reveal quedan en opacity:0 inline;
            forzamos visibilidad para navegadores sin JavaScript. */}
        <noscript>
          <style>{`*{opacity:1!important;transform:none!important;animation:none!important;transition:none!important}`}</style>
        </noscript>
        <MotionProvider>{children}</MotionProvider>
        <div className="print:hidden">
          <Toaster />
        </div>
      </body>
    </html>
  );
}
