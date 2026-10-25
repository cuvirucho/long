import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, CircleAlert, Search } from "lucide-react";
import { isFirebaseConfigured } from "../config/firebase.js";
import {
  CREATION_PUBLISHED_EVENT,
  MIN_SEARCH,
  PAGE_SIZE,
  fetchCreation,
  fetchCreationsPage,
} from "../services/creations.js";
import CreationCard from "./CreationCard.jsx";
import SectionTitle from "./SectionTitle.jsx";

const SORTS = [
  { id: "votes", label: "Más votados" },
  { id: "recent", label: "Recientes" },
];

export default function CreationsSection() {
  return (
    <section
      className="section creations"
      id="creaciones"
      aria-labelledby="creations-title"
    >
      <div className="container">
        <SectionTitle
          id="creations-title"
          title="Creaciones de la comunidad"
          subtitle="Vota por tus favoritos y comparte para que más gente vote."
        />
        {isFirebaseConfigured ? (
          <CreationsBrowser />
        ) : (
          <div className="admin-warning creations__warning" role="note">
            <CircleAlert size={18} aria-hidden="true" />
            <p>
              <strong>Aviso para el administrador:</strong> Firebase aún no está
              configurado. Copia <code>.env.example</code> como{" "}
              <code>.env.local</code> y completa los datos de tu proyecto para
              habilitar las creaciones y los votos.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function CreationsBrowser() {
  const [sort, setSort] = useState("votes");
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [reloadToken, setReloadToken] = useState(0);
  const [result, setResult] = useState({
    key: null,
    items: [],
    nextCursor: null,
    error: null,
  });
  const [featured, setFeatured] = useState(null);
  // cursors[n] = último documento de la página n - 1 (null para la primera).
  const cursorsRef = useRef([null]);
  const topRef = useRef(null);

  const requestKey = `${sort}|${search}|${page}|${reloadToken}`;
  const isLoading = result.key !== requestKey;

  const restart = () => {
    cursorsRef.current = [null];
    setPage(0);
  };

  // Búsqueda con debounce: no consulta en cada tecla.
  useEffect(() => {
    const term = query.trim();
    const next = term.length >= MIN_SEARCH ? term : "";
    const timer = setTimeout(() => {
      if (next === search) return;
      cursorsRef.current = [null];
      setPage(0);
      setSearch(next);
    }, 400);
    return () => clearTimeout(timer);
  }, [query, search]);

  useEffect(() => {
    let cancelled = false;
    fetchCreationsPage({
      sort,
      search,
      cursor: cursorsRef.current[page] ?? null,
    })
      .then(({ items, nextCursor }) => {
        if (cancelled) return;
        cursorsRef.current[page + 1] = nextCursor;
        setResult({ key: requestKey, items, nextCursor, error: null });
      })
      .catch((error) => {
        console.error("No se pudieron cargar las creaciones:", error);
        if (!cancelled)
          setResult({ key: requestKey, items: [], nextCursor: null, error });
      });
    return () => {
      cancelled = true;
    };
  }, [sort, search, page, requestKey]);

  // Al publicar desde el modal, se muestran las más recientes desde la página 1.
  useEffect(() => {
    const onPublished = () => {
      cursorsRef.current = [null];
      setSort("recent");
      setPage(0);
      setReloadToken((value) => value + 1);
    };
    window.addEventListener(CREATION_PUBLISHED_EVENT, onPublished);
    return () =>
      window.removeEventListener(CREATION_PUBLISHED_EVENT, onPublished);
  }, []);

  // Enlace compartido (?creacion=<id>): se muestra destacada arriba.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("creacion");
    if (!id) return;
    fetchCreation(id)
      .then((creation) => {
        if (!creation) return;
        setFeatured(creation);
        requestAnimationFrame(() =>
          topRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        );
      })
      .catch((error) =>
        console.error("No se pudo cargar la creación compartida:", error),
      );
  }, []);

  const changeSort = (id) => {
    if (id === sort) return;
    restart();
    setSort(id);
  };

  const goToPage = (next) => {
    setPage(next);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const items = result.items.filter((creation) => creation.id !== featured?.id);

  return (
    <div className="creations__browser" ref={topRef}>
      {featured && (
        <div className="creations__featured">
          <CreationCard
            key={`featured-${featured.id}`}
            creation={featured}
            featured
          />
        </div>
      )}

      <div className="creations__toolbar">
        <label className="creations__search">
          <Search size={18} aria-hidden="true" />
          <span className="visually-hidden">
            Buscar por nombre del wrap o creador
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nombre o creador"
            maxLength={40}
          />
        </label>

        <div
          className="creations__sort"
          role="group"
          aria-label="Ordenar creaciones"
        >
          {SORTS.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`creations__sort-btn ${sort === option.id ? "is-active" : ""}`}
              aria-pressed={sort === option.id}
              onClick={() => changeSort(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div aria-live="polite" aria-busy={isLoading}>
        {isLoading ? (
          <ul className="creations__grid" aria-label="Cargando creaciones">
            {Array.from({ length: 3 }, (_, index) => (
              <li key={index} className="creation-skeleton" />
            ))}
          </ul>
        ) : result.error ? (
          <div className="creations__empty">
            <p>No pudimos cargar las creaciones.</p>
            <button
              type="button"
              className="btn btn--ghost btn--md"
              onClick={() => setReloadToken((value) => value + 1)}
            >
              Reintentar
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="creations__empty">
            <p>
              {search
                ? `No encontramos wraps ni creadores que empiecen con "${search}".`
                : "Aún no hay creaciones. ¡Crea tu wrap y sé el primero en publicarlo!"}
            </p>
          </div>
        ) : (
          <ul className="creations__grid">
            {items.map((creation) => (
              <li key={creation.id}>
                <CreationCard creation={creation} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {(page > 0 || result.nextCursor) && (
        <nav className="pager" aria-label="Paginación de creaciones">
          <button
            type="button"
            className="btn btn--ghost btn--md"
            onClick={() => goToPage(page - 1)}
            disabled={page === 0 || isLoading}
          >
            <ChevronLeft size={18} aria-hidden="true" /> Anterior
          </button>
          <span className="pager__label">Página {page + 1}</span>
          <button
            type="button"
            className="btn btn--navy btn--md"
            onClick={() => goToPage(page + 1)}
            disabled={!result.nextCursor || isLoading}
          >
            Siguiente <ChevronRight size={18} aria-hidden="true" />
          </button>
        </nav>
      )}
    </div>
  );
}
