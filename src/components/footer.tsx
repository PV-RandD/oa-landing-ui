import { AssetMedia } from "./asset-media";
export function Footer() {
  return (
    <footer className="site-footer wrap">
      <div className="footer-top">
        <div>
          <a className="brand" href="#home" aria-label="OpenAssets home">
            <AssetMedia
              src="/assets/oa-logo.png"
              width="1921"
              height="305"
              alt="OpenAssets"
            />
          </a>
          <p>
            Infrastructure for issuing
            <br />
            and managing digital assets.
          </p>
        </div>
        <div>
          <h2>Explore</h2>
          <a href="#tokenization">Tokenization</a>
          <a href="#benefits">Benefits</a>
          <a href="#process">How it works</a>
        </div>
        <div>
          <h2>OpenAssets</h2>
          <a href="https://www.openassets.to/about/">About us</a>
          <a href="https://www.openassets.to/blog/">Insights</a>
          <a href="https://www.openassets.to/partner/">Talk to our team</a>
        </div>
        <div>
          <h2>Connect</h2>
          <a href="https://www.linkedin.com/company/openassetsinc/">
            LinkedIn ↗
          </a>
          <a href="https://x.com/openassetsinc">X ↗</a>
          <a href="#home">Back to top ↑</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © <span>{new Date().getFullYear()}</span> OpenAssets, Inc. All rights
          reserved.
        </span>
        <div>
          <a href="https://www.openassets.to/privacy-policy/">Privacy</a>
          <a href="https://www.openassets.to/terms/">Terms</a>
          <a href="https://www.openassets.to/disclosures/">Disclaimer</a>
        </div>
      </div>
    </footer>
  );
}
