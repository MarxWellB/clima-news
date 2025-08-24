import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";


function useDebounced(value, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function App() {
  const [query, setQuery] = useState("San Salvador");
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSug, setLoadingSug] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const debounced = useDebounced(query, 300);

 
  useEffect(() => {
    const q = debounced.trim();
    if (!q) {
      setSuggestions([]);
      return;
    }
    setLoadingSug(true);
    fetch(`${API_BASE}/api/cities/search?q=${encodeURIComponent(q)}`)
      .then((r) => r.json())
      .then(setSuggestions)
      .catch(() => setSuggestions([]))
      .finally(() => setLoadingSug(false));
  }, [debounced]);

  const onSearch = (city) => {
    const c = city || query;
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/api/combined?city=${encodeURIComponent(c)}&country=SV`)
      .then((r) => r.json())
      .then((j) => {
        if (j.error) throw new Error(j.error);
        setData(j);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

 
  useEffect(() => {
    onSearch(query);
  }, []);

  const noticias = data?.noticias ?? [];
  const clima = data?.clima;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
        Weather + News Dashboard
      </h1>

      {/* Buscador */}
      <div className="relative mb-6">
        <div className="flex gap-2">
          <input
            className="flex-1 bg-white rounded-xl shadow px-4 py-3 outline-none"
            placeholder="Buscar ciudad..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
          />
          <button
            className="px-5 py-3 rounded-xl bg-black text-white shadow hover:opacity-90"
            onClick={() => onSearch()}
          >
            Buscar
          </button>
        </div>
        {!!suggestions.length && (
          <ul className="absolute z-10 mt-1 w-full bg-white rounded-xl shadow border divide-y">
            {suggestions.map((c, i) => (
              <li
                key={i}
                className="px-4 py-2 hover:bg-slate-50 cursor-pointer"
                onClick={() => {
                  setQuery(`${c.name}`);
                  setSuggestions([]);
                  onSearch(c.name);
                }}
              >
                {c.name}
                {c.country ? `, ${c.country}` : ""}
              </li>
            ))}
            {loadingSug && (
              <li className="px-4 py-2 text-sm text-slate-500">Buscando…</li>
            )}
          </ul>
        )}
      </div>

      {/* Estado de carga y error */}
      {loading && <div className="text-slate-500 mb-4">Cargando…</div>}
      {error && <div className="text-red-600 mb-4">Error: {error}</div>}

      {/* Clima */}
      {clima && (
        <section className="bg-white rounded-2xl shadow p-6 mb-6">
          <div className="text-sm text-slate-500">Ubicación</div>
          <div className="text-2xl font-semibold">
            {clima.ciudad}
            {clima.pais ? `, ${clima.pais}` : ""}
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat label="Temp." value={Math.round(clima.temp.actual)} unit="°C" />
            <Stat
              label="Sensación"
              value={Math.round(clima.temp.sensacion)}
              unit="°C"
            />
            <Stat label="Humedad" value={clima.temp.humedad} unit="%" />
            <Stat label="Viento" value={clima.viento.velocidad} unit="m/s" />
          </div>

          <div className="mt-3 text-slate-600 capitalize">
            {clima.clima.estado} — {clima.clima.descripcion}
          </div>
        </section>
      )}

      {/* Noticias */}
      <section className="bg-white rounded-2xl shadow p-6">
        <div className="text-lg font-semibold mb-3">Noticias</div>
        {noticias.length ? (
          <ul className="grid md:grid-cols-3 gap-4">
            {noticias.map((n, i) => (
              <li
                key={i}
                className="border rounded-xl overflow-hidden bg-slate-50"
              >
                {n.imagen && (
                  <img
                    src={n.imagen}
                    alt=""
                    className="w-full h-28 object-cover"
                  />
                )}
                <div className="p-4">
                  <a
                    className="font-medium hover:underline line-clamp-2"
                    href={n.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {n.titulo}
                  </a>
                  <div className="text-xs text-slate-500 mt-1">
                    {n.fuente}
                    {n.publicado
                      ? ` · ${new Date(n.publicado).toLocaleString("es-SV")}`
                      : ""}
                  </div>
                  {n.descripcion && (
                    <p className="text-sm text-slate-600 mt-2 line-clamp-3">
                      {n.descripcion}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-slate-500">Sin noticias para esta búsqueda.</div>
        )}
      </section>

      <footer className="text-center text-xs text-slate-400 mt-10">
        Hecho con ❤️ — React + Tailwind — Fuente: OpenWeather & News API
      </footer>
    </div>
  );
}

function Stat({ label, value, unit }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 border">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-xl font-semibold">
        {value}
        {unit ? ` ${unit}` : ""}
      </div>
    </div>
  );
}
