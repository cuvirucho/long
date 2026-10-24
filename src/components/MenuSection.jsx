import { useState } from "react";
import { MENU } from "../data/menu.js";
import ProductModal from "./ProductModal.jsx";
import SectionTitle from "./SectionTitle.jsx";
import TropicalLeaf from "./TropicalLeaf.jsx";
import WrapCard from "./WrapCard.jsx";

export default function MenuSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="section menu" id="menu" aria-labelledby="menu-title">
      <TropicalLeaf className="leaf leaf--menu-l" />
      <TropicalLeaf className="leaf leaf--menu-r" />
      <div className="container">
        <SectionTitle
          id="menu-title"
          title="Nuestro menú"
          subtitle="Wraps clásicos, especiales y mucho más."
        />
        <div className="menu__grid">
          {MENU.map((product) => (
            <WrapCard
              key={product.id}
              product={product}
              onSelect={setSelected}
            />
          ))}
        </div>
      </div>
      {selected && (
        <ProductModal
          key={selected.id}
          product={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
