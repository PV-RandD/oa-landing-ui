import type { NextConfig } from "next";
// Mount path comes from SITE_URL so a project GitHub Pages URL and a custom
// domain need no code change. Exposed through env so asset() sees it in both
// server and client bundles.
const basePath = new URL(process.env.SITE_URL || "http://localhost:3000")
  .pathname.replace(/\/$/, "");
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  devIndicators: false,
  images: { unoptimized: true },
  basePath,
  env: { BASE_PATH: basePath },
};
export default config;
