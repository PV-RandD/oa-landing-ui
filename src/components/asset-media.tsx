import type { ImgHTMLAttributes } from "react";
import { asset } from "@/lib/site";

// Already optimized, art-directed assets are served directly from public/.
// Keep intrinsic dimensions and the still-image API shared by every section.
export function AssetMedia(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      decoding="async"
      {...props}
      src={typeof props.src === "string" ? asset(props.src) : props.src}
      alt={props.alt ?? ""}
    />
  );
}
