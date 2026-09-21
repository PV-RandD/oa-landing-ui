const configuredUrl = process.env.SITE_URL || "http://127.0.0.1:4173";
export const siteUrl = new URL(configuredUrl);
export const indexable = process.env.SITE_INDEXABLE === "true";
if (indexable && siteUrl.protocol !== "https:")
  throw new Error("Public indexing requires an HTTPS SITE_URL.");
if (
  siteUrl.pathname !== "/" ||
  siteUrl.search ||
  siteUrl.hash ||
  siteUrl.username
) {
  throw new Error(
    "SITE_URL must be a site origin without a path, query, fragment, or credentials.",
  );
}
