import axios from "axios";

const PROVIDER = (process.env.NEWS_PROVIDER || "newsapi").toLowerCase();

export async function fetchNews({ q, lang = "es", country }) {
  const API_KEY = process.env.NEWS_API_KEY;        
  if (!API_KEY) throw new Error("Falta NEWS_API_KEY en .env");

  if (PROVIDER === "gnews") {
    const { data } = await axios.get("https://gnews.io/api/v4/search", {
      params: { q, lang, country, max: 10, apikey: API_KEY },
      timeout: 10000
    });
    return (data.articles || data.data || []).map(n => ({
      titulo: n.title,
      descripcion: n.description,
      url: n.url,
      fuente: n.source?.name || n.source || "gnews",
      publicado: n.publishedAt || n.published_at || null,
      imagen: n.image || null
    }));
  }

  const { data } = await axios.get("https://newsapi.org/v2/everything", {
    headers: { "X-Api-Key": API_KEY },
    params: { q: `"${q}"`, language: lang, sortBy: "publishedAt", pageSize: 10 },
    timeout: 10000
  });
  return (data.articles || []).map(n => ({
    titulo: n.title,
    descripcion: n.description,
    url: n.url,
    fuente: n.source?.name || "newsapi",
    publicado: n.publishedAt || null,
    imagen: n.urlToImage || null
  }));
}