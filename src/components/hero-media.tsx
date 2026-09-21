"use client";

import { useEffect, useRef } from "react";
import { createHeroController } from "@/lib/hero-controller.mjs";
import { useMotionPreference } from "./motion-provider";
import { AssetMedia } from "./asset-media";

type HeroMediaProps = {
  desktopStill?: string;
  mobileStill?: string;
  desktopVideo?: string;
  mobileVideo?: string;
  alt?: string;
};
export function HeroMedia({
  desktopStill = "/assets/hero-open-rails.webp",
  mobileStill = "/assets/hero-open-rails-mobile.webp",
  desktopVideo = "/assets/hero-open-rails-loop.mp4",
  mobileVideo = "/assets/hero-open-rails-mobile-loop.mp4",
  alt = "Glass asset modules travel along silver rails toward an open horizon.",
}: HeroMediaProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const controller = useRef<ReturnType<typeof createHeroController> | null>(
    null,
  );
  const { paused } = useMotionPreference();
  useEffect(() => {
    const video = ref.current;
    if (!video || !desktopVideo || !mobileVideo) return;
    const instance = createHeroController(video, video.closest(".hero"));
    controller.current = instance;
    return () => {
      instance.destroy();
      controller.current = null;
    };
  }, [desktopVideo, mobileVideo]);
  useEffect(() => {
    controller.current?.setPaused(paused);
  }, [paused, desktopVideo, mobileVideo]);
  return (
    <>
      <picture className="hero-art">
        <source media="(max-width: 700px)" srcSet={mobileStill} />
        <AssetMedia
          src={desktopStill}
          width={1672}
          height={941}
          fetchPriority="high"
          alt={alt}
        />
      </picture>
      {desktopVideo && mobileVideo ? (
        <video
          ref={ref}
          className="hero-video"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          data-desktop-src={desktopVideo}
          data-mobile-src={mobileVideo}
        />
      ) : null}
    </>
  );
}
