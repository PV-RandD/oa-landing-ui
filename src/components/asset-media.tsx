import type { ImgHTMLAttributes } from "react";

// Already optimized, art-directed assets are served directly from public/.
// Keep intrinsic dimensions and the still-image API shared by every section.
export function AssetMedia(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img decoding="async" {...props} alt={props.alt ?? ""} />;
}
