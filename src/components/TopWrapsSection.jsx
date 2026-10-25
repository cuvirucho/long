import { useEffect, useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { isFirebaseConfigured } from "../config/firebase.js";
import { TOP_WRAPS } from "../data/topWraps.js";
import { useCart } from "../hooks/useCart.js";
import { fetchTopCreations } from "../services/creations.js";
import { formatMoney } from "../utils/money.js";
import { calculateWrapPrice, createWrapSnapshot } from "../utils/wrapPricing.js";
import Button from "./Button.jsx";
import SectionTitle from "./SectionTitle.jsx";
import TropicalLeaf from "./TropicalLeaf.jsx";
import WrapRecipe from "./WrapRecipe.jsx";

const MEDALS = ["🥇", "🥈", "🥉"];

export default function TopWrapsSection() {
  const { addCustomWrap } = useCart();
  const [wraps, setWraps] = useState(TOP_WRAPS);

  // Los 3 más votados de la comunidad; si aún no hay 3, quedan los de ejemplo.
  useEffect(() => {
    if (!isFirebaseConfigured) return undefined;
    let cancelled = false;
    fetchTopCreations(3)
      .then((top) => {
        if (cancelled || top.length < 3) return;
        setWraps(top.map((creation) => ({ ...creation, likes: creation.votes })));
      })
      .catch((error) => console.error("No se pudo cargar el Top 3:", error));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      className="section top-wraps"
      id="top-wraps"
      aria-labelledby="top-wraps-title"
    >
      <TropicalLeaf className="leaf leaf--menu-l" />
      <TropicalLeaf className="leaf leaf--menu-r" />
      <div className="container">
        <SectionTitle
          id="top-wraps-title"
          title="Top 3 de la comunidad"
          subtitle="Los wraps favoritos creados por nuestros clientes."
        />
        <ol className="top-wraps__grid">
          {wraps.slice(0, 3).map((wrap, index) => (
            <li
              key={wrap.id}
              className={`top-card top-card--${index + 1}`}
            >
              <div className="top-card__head">
                <span className="top-card__medal" aria-hidden="true">
                  {MEDALS[index]}
                </span>
                <span className="top-card__rank">#{index + 1}</span>
                <span className="top-card__likes">
                  <Heart size={16} aria-hidden="true" /> {wrap.likes}
                  <span className="visually-hidden"> me gusta</span>
                </span>
              </div>

              <h3 className="top-card__name">{wrap.name}</h3>
              <p className="top-card__creator">
                creado por <strong>{wrap.creator}</strong>
              </p>
              {wrap.quote && (
                <p className="top-card__quote">“{wrap.quote}”</p>
              )}

              <WrapRecipe selection={wrap.selection} />

              <div className="top-card__footer">
                <span className="price">
                  {formatMoney(calculateWrapPrice(wrap.selection))}
                </span>
                <Button
                  variant={index === 0 ? "primary" : "navy"}
                  icon={ShoppingBag}
                  onClick={() =>
                    addCustomWrap(createWrapSnapshot(wrap.selection), wrap.name)
                  }
                >
                  Lo quiero
                </Button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
