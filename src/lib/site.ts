const configuredUrl = process.env.SITE_URL || "http://localhost:3000";
export const siteUrl = new URL(configuredUrl);
export const indexable = process.env.SITE_INDEXABLE === "true";
if (indexable && siteUrl.protocol !== "https:")
  throw new Error("Public indexing requires an HTTPS SITE_URL.");
if (siteUrl.search || siteUrl.hash || siteUrl.username) {
  throw new Error(
    "SITE_URL must be a site origin plus optional base path, without query, fragment, or credentials.",
  );
}
// Inlined at build time by next.config.ts; "" when SITE_URL has no path.
export const basePath = process.env.BASE_PATH ?? "";
export const asset = (path: string) =>
  path.startsWith("/") ? basePath + path : path;
