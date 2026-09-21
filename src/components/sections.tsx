import { SectionLabel } from "./section-label";
import { Reveal } from "./motion-provider";
import { AssetMedia } from "./asset-media";

export function Introduction() {
  return (
    <section
      className="intro-section section wrap"
      id="tokenization"
      aria-labelledby="intro-title"
    >
      <SectionLabel>01 / Tokenization explained</SectionLabel>
      <div className="intro-grid">
        <Reveal className="">
          <h2 id="intro-title">
            Real-world assets.
            <br />
            <span className="muted">Represented digitally.</span>
          </h2>
          <p className="body-copy">
            Tokenization represents ownership or rights over an asset as digital
            tokens on a blockchain. What each token represents depends on the
            asset and how the issuer structures it.
          </p>
          <p className="body-copy">
            OpenAssets provides the technology to issue and manage those tokens,
            with programmable controls for asset transfers and participant
            eligibility.
          </p>
          <a className="inline-link" href="#process">
            Explore the issuance process <span aria-hidden="true">↗</span>
          </a>
        </Reveal>
        <figure className="intro-visual reveal">
          <AssetMedia
            src="/assets/benefit-tokenization.webp"
            width="1448"
            height="1086"
            loading="lazy"
            alt="One solid asset is represented by four connected digital tiles."
          />
          <figcaption>
            <span>REAL-WORLD ASSET</span>
            <span className="fig-rail" aria-hidden="true" />
            <span>DIGITAL REPRESENTATION</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function AssetTypes() {
  return (
    <section
      className="possibilities section"
      aria-labelledby="possibilities-title"
    >
      <div className="wrap">
        <SectionLabel>04 / Asset types and use cases</SectionLabel>
        <div className="possibilities-grid">
          <Reveal className="">
            <h2 id="possibilities-title">
              Start with
              <br />
              your asset.
              <br />
              <span className="muted">Define its use.</span>
            </h2>
            <p className="body-copy">
              Explore examples of what digital tokens can represent. Each use
              case needs its own issuance structure and operating rules.
            </p>
            <a
              className="inline-link"
              href="https://www.openassets.to/asset-tokenization/"
            >
              Explore tokenization solutions <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
          <div className="asset-list">
            <div>
              <span>01</span>
              <h3>Commodities</h3>
              <p>Tokens that represent rights to physical commodities.</p>
            </div>
            <div>
              <span>02</span>
              <h3>Equity &amp; funds</h3>
              <p>Digital representations of shares or fund interests.</p>
            </div>
            <div>
              <span>03</span>
              <h3>Bonds &amp; debt</h3>
              <p>
                Tokens that represent debt instruments and their associated
                rights.
              </p>
            </div>
            <div>
              <span>04</span>
              <h3>Digital currencies</h3>
              <p>Digital units for payment and settlement use cases.</p>
            </div>
            <div>
              <span>05</span>
              <h3>Loyalty points</h3>
              <p>Digital rewards for customer and community programs.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Resources() {
  return (
    <section
      className="insights-section section wrap"
      id="insights"
      aria-labelledby="insights-title"
    >
      <SectionLabel>05 / Explore OpenAssets</SectionLabel>
      <Reveal className="section-heading">
        <h2 id="insights-title">
          Learn about
          <br />
          <span className="muted">our work.</span>
        </h2>
        <a className="inline-link" href="https://www.openassets.to/blog/">
          Read our blog <span aria-hidden="true">↗</span>
        </a>
      </Reveal>
      <div className="insight-grid">
        <a
          className="insight-card"
          href="https://www.openassets.to/asset-tokenization/"
        >
          <div className="insight-image">
            <AssetMedia
              src="/assets/benefit-issuance.webp"
              loading="lazy"
              width="1448"
              height="1086"
              alt="Configurable glass asset modules on metal rails."
            />
            <span className="card-arrow" aria-hidden="true">
              ↗
            </span>
          </div>
          <p className="eyebrow">Explore / Tokenization</p>
          <h3>
            Explore our tokenization
            <br />
            capabilities.
          </h3>
        </a>
        <a
          className="insight-card"
          href="https://www.openassets.to/3f-consortium/"
        >
          <div className="insight-image">
            <AssetMedia
              src="/assets/benefit-global.webp"
              loading="lazy"
              width="1448"
              height="1086"
              alt="An interconnected network spanning global markets."
            />
            <span className="card-arrow" aria-hidden="true">
              ↗
            </span>
          </div>
          <p className="eyebrow">Explore / Forge Finance Forum</p>
          <h3>
            Meet the Forge
            <br />
            Finance Forum.
          </h3>
        </a>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="closing" id="contact" aria-labelledby="closing-title">
      <AssetMedia
        src="/assets/hero-open-rails.webp"
        loading="lazy"
        width="1672"
        height="941"
        alt=""
        className="closing-art"
      />
      <div className="closing-shade" />
      <Reveal className="wrap">
        <p className="eyebrow">Discuss your project</p>
        <h2 id="closing-title">
          What do you want
          <br />
          to tokenize?
        </h2>
        <p>
          Tell us about your asset and what you want to achieve. Our team can
          discuss the requirements with you.
        </p>
        <a
          className="button button-light"
          href="https://www.openassets.to/partner/"
        >
          Talk to our team <span aria-hidden="true">↗</span>
        </a>
      </Reveal>
    </section>
  );
}
