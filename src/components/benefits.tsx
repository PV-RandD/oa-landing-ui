"use client";

import { SectionLabel } from "./section-label";
import { useRef, useState } from "react";
import { benefits, partnerUrl } from "@/lib/content";
import { AssetMedia } from "./asset-media";
import { Reveal } from "./motion-provider";

export function Benefits() {
  const [active, setActive] = useState(0);
  const [visited, setVisited] = useState(() => new Set([0]));
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  function select(index: number, focus = false) {
    setActive(index);
    setVisited((previous) => new Set(previous).add(index));
    if (focus) refs.current[index]?.focus();
  }
  return (
    <section
      className="benefits-section section"
      id="benefits"
      aria-labelledby="benefits-title"
    >
      <div className="wrap">
        <SectionLabel>02 / Built around your assets</SectionLabel>
        <Reveal className="section-heading">
          <h2 id="benefits-title">
            Issue your assets.
            <br />
            <span className="muted">Manage what follows.</span>
          </h2>
          <p>
            Explore the tools behind issuance, participant controls, and ongoing
            asset management.
          </p>
        </Reveal>
        <div
          className="benefit-tabs"
          role="tablist"
          aria-label="Platform benefits"
        >
          {benefits.map((benefit, index) => (
            <button
              key={benefit.id}
              ref={(element) => {
                refs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`tab-${benefit.id}`}
              aria-controls={`panel-${benefit.id}`}
              aria-selected={active === index}
              tabIndex={active === index ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(event) => {
                let target: number | undefined;
                if (event.key === "ArrowRight")
                  target = (index + 1) % benefits.length;
                if (event.key === "ArrowLeft")
                  target = (index - 1 + benefits.length) % benefits.length;
                if (event.key === "Home") target = 0;
                if (event.key === "End") target = benefits.length - 1;
                if (target !== undefined) {
                  event.preventDefault();
                  select(target, true);
                }
              }}
            >
              <span>0{index + 1}</span>
              {benefit.label}
            </button>
          ))}
        </div>
        <div className="benefit-panels">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className="benefit-panel"
              role="tabpanel"
              id={`panel-${benefit.id}`}
              aria-labelledby={`tab-${benefit.id}`}
              tabIndex={0}
              hidden={active !== index}
              inert={active !== index}
              aria-hidden={active !== index}
            >
              <div className="benefit-copy">
                <span className="large-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
                <a className="inline-link" href={partnerUrl}>
                  Discuss your project <span aria-hidden="true">↗</span>
                </a>
                <div className="feature-tags">
                  {benefit.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <AssetMedia
                src={visited.has(index) ? benefit.image : undefined}
                width={1448}
                height={1086}
                loading="lazy"
                alt={benefit.alt}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
