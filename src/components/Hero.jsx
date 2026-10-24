import { ShoppingCart } from "lucide-react";
import { Burst } from "../assets/icons/Doodles.jsx";
import Button from "./Button.jsx";
import GooseMascot from "./GooseMascot.jsx";
import SmartImage from "./SmartImage.jsx";
import TropicalLeaf from "./TropicalLeaf.jsx";
import WrapIllustration from "./WrapIllustration.jsx";

function BrandCup() {
  return (
    <div className="hero__cup" aria-hidden="true">
      <div className="hero__cup-lid" />
      <div className="hero__cup-body">
        <span className="hero__cup-logo">
          <GooseMascot variant="head" holdingWrap={false} />
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <TropicalLeaf className="leaf leaf--hero-bl" color="var(--orange)" />
      <TropicalLeaf className="leaf leaf--hero-br" />

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">Wraps personalizados</p>
          <h1 className="hero__title" id="hero-title">
            <span className="hero__title-navy">Tu sabor,</span>
            <span className="hero__title-orange">tu wrap</span>
          </h1>
          <p className="hero__text">
            Ingredientes frescos, combinaciones infinitas y todo el sabor en un
            solo bocado.
          </p>
          <div className="hero__ctas">
            <Button as="a" href="#menu" icon={ShoppingCart} size="lg">
              Ordena ahora
            </Button>
            <a className="hero__secondary" href="#crea-tu-wrap">
              o crea el tuyo
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__sun" aria-hidden="true" />
          <GooseMascot className="hero__goose" title="Mascota de Long Wraps" />
          <SmartImage
            imageKey="heroWrap"
            alt="Wrap abierto relleno de pollo a la parrilla y vegetales frescos"
            className="hero__photo"
            loading="eager"
            fallback={<WrapIllustration variant="pollo" withBoard />}
          />
          <BrandCup />
          <p className="hero__note" aria-hidden="true">
            <Burst className="hero__note-burst" />
            Fresco
            <br />
            rico
            <br />
            único
          </p>
        </div>
      </div>
    </section>
  );
}
