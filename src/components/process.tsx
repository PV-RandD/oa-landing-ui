"use client";

import { SectionLabel } from "./section-label";
import { useRef, useState } from "react";
import { useInView } from "motion/react";
import { steps } from "@/lib/content";
import { Reveal } from "./motion-provider";

export function Process() {
  const [active, setActive] = useState<number | null>(0);
  const illustration = useRef<HTMLDivElement>(null);
  const inView = useInView(illustration);
  return (
    <section
      className="process-section section wrap"
      id="process"
      aria-labelledby="process-title"
    >
      <SectionLabel>03 / From idea to issuance</SectionLabel>
      <Reveal className="section-heading">
        <h2 id="process-title">
          Plan your issuance.
          <br />
          <span className="muted">Step by step.</span>
        </h2>
        <p>
          Use these four stages to frame your project discussion. The scope will
          depend on your asset and requirements.
        </p>
      </Reveal>
      <div className="process-grid">
        <div className="step-list">
          {steps.map((step, index) => (
            <details key={step.title} className="step" open={active === index}>
              <summary
                onClick={(event) => {
                  event.preventDefault();
                  setActive((current) => (current === index ? null : index));
                }}
              >
                <span className="step-number">0{index + 1}</span>
                <span>{step.title}</span>
                <span className="step-symbol" aria-hidden="true">
                  +
                </span>
              </summary>
              <p>{step.description}</p>
            </details>
          ))}
        </div>
        <div
          ref={illustration}
          className={`process-visual${inView ? "" : " offscreen"}`}
          aria-label="Illustration of the four-stage tokenization journey"
        >
          <div className="diagram-top">
            <span>THE ASSET JOURNEY</span>
            <span>{active === null ? "—" : `0${active + 1}`} / 04</span>
          </div>
          <div
            className="rail-diagram"
            data-stage={active ?? -1}
            aria-hidden="true"
          >
            {["a", "b", "c"].map((rail) => (
              <div key={rail} className={`rail rail-${rail}`} />
            ))}
            {["one", "two", "three", "four"].map((block) => (
              <div key={block} className={`asset-block block-${block}`}>
                <span />
              </div>
            ))}
            <div className="rail-light" />
          </div>
          <div className="diagram-bottom">
            <div>
              <span className="eyebrow">CURRENT STAGE</span>
              <h3>
                {active === null ? "Explore a step" : steps[active].title}
              </h3>
            </div>
            <span className="diagram-arrow" aria-hidden="true">
              ↗
            </span>
          </div>
          <div
            className="stage-track"
            role="group"
            aria-label="Select a process step"
          >
            {steps.map((step, index) => (
              <button
                key={step.title}
                type="button"
                aria-label={`Step ${index + 1}: ${step.title}`}
                aria-pressed={active === index}
                className={active !== null && index <= active ? "active" : ""}
                onClick={() => setActive(index)}
              >
                0{index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
