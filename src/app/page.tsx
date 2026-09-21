import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import {
  Introduction,
  AssetTypes,
  Resources,
  Contact,
} from "@/components/sections";
import { Benefits } from "@/components/benefits";
import { Process } from "@/components/process";
import { Footer } from "@/components/footer";

export default function LandingPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <div className="asset-strip">
          <div className="wrap">
            <span className="strip-label">Explore asset types</span>
            <ul aria-label="Asset categories">
              {[
                "Commodities",
                "Equity",
                "Bonds",
                "Funds",
                "Digital currencies",
                "Loyalty points",
              ].map((asset) => (
                <li key={asset}>{asset}</li>
              ))}
            </ul>
          </div>
        </div>
        <Introduction />
        <Benefits />
        <Process />
        <AssetTypes />
        <Resources />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
