import { ArrowRight } from "lucide-react";
import { useCart } from "../hooks/useCart.js";
import Button from "./Button.jsx";
import GooseMascot from "./GooseMascot.jsx";
import SmartImage from "./SmartImage.jsx";
import TropicalLeaf from "./TropicalLeaf.jsx";
import WrapIllustration from "./WrapIllustration.jsx";
import { IMAGES } from "../assets/images/index.js";

export default function CreateWrapBanner() {
  const { openBuilder } = useCart();

  return (
    <section className="banner" aria-labelledby="banner-title">
      <TropicalLeaf className="leaf leaf--banner-l" color="#0E7F91" />
      <TropicalLeaf className="leaf leaf--banner-r" color="#0E7F91" />
      <div className="container banner__inner">
        <div className="banner__mascot">
          <p className="banner__note" aria-hidden="true">
            El wrap
            <br />
            perfecto
            <br />
            existe
          </p>
          <img
            className="banner__goose"
            title="Mascota de Long Wraps"
            src={IMAGES.mascota2}
            alt="Mascota de Long Wraps"
          />
        </div>

        <div className="banner__copy">
          <h2 id="banner-title" className="banner__title">
            <span>Crea tu</span>
            <span className="banner__title-big">wrap</span>
          </h2>
          <p className="banner__text">Tú eliges, nosotros lo preparamos.</p>
          <Button
            variant="navy"
            onClick={openBuilder}
            size="lg"
            iconRight={ArrowRight}
          >
            Empieza a crear
          </Button>
        </div>

        <img
          src={IMAGES.bannerWrap}
          alt="Wrap grande con ingredientes coloridos"
          className="banner__photo"
        />
      </div>
    </section>
  );
}
