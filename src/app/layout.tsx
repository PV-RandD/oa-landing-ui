import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { MotionProvider } from "@/components/motion-provider";
import localFont from "next/font/local";
import { siteUrl, indexable, asset } from "@/lib/site";
import "./globals.css";

const plex = localFont({
  src: "../../public/assets/fonts/plex-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-plex",
});

const title = "OpenAssets | Real-world asset tokenization";
const description =
  "Explore asset issuance, management, and programmable compliance tools from OpenAssets. Tokenization infrastructure for institutions.";
const image = {
  // Next prefixes Open Graph image paths with basePath itself.
  url: "/assets/hero-open-rails.png",
  width: 1672,
  height: 941,
  alt: "Glass asset modules on silver rails toward an open horizon.",
};
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  alternates: { canonical: "/" },
  robots: { index: indexable, follow: indexable },
  icons: { icon: asset("/assets/favicon.svg") },
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "OpenAssets",
    url: "/",
    images: [image],
  },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};
export const viewport: Viewport = { themeColor: "#131313" };
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={plex.variable}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
