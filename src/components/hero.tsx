import { HeroMedia } from "./hero-media";
import { MotionToggle } from "./motion-provider";
export function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <HeroMedia />

      <div className="hero-shade" />
      <div className="hero-copy wrap">
        <p className="eyebrow">
          <span className="signal" /> Tokenization infrastructure for
          institutions
        </p>
        <h1 id="hero-title">
          Real assets.
          <br />
          <span>Open possibilities.</span>
        </h1>
        <p className="hero-description">
          Issue and manage digital representations of real-world assets.
          OpenAssets builds tokenization infrastructure for institutions, with
          configurable issuance and compliance tools.
        </p>
        <div className="actions">
          <a
            className="button button-light"
            href="https://www.openassets.to/partner/"
          >
            Talk to our team <span aria-hidden="true">↗</span>
          </a>
          <a className="text-link" href="#tokenization">
            Explore tokenization <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div className="hero-bottom wrap">
        <a href="#tokenization" className="scroll-cue">
          <span aria-hidden="true">↓</span> What is tokenization?
        </a>
        <span className="hero-caption">
          Infrastructure for tokenized assets.
        </span>
        <MotionToggle />
      </div>
    </section>
  );
}
