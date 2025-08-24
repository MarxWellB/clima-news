import { fetchNews } from "../services/newsService.js";

export async function newsHandler(req, res) {
  try {
    const { city, q, lang = "es", country = "SV" } = req.query;
    const term = q || city;
    if (!term) return res.status(400).json({ error: "Falta parámetro q o city" });

    const articles = await fetchNews({ q: term, lang, country });
    res.json({ q: term, articulos: articles });
  } catch (err) {
    console.error("NEWS error:", err.response?.status, err.response?.data || err.message);
    if (err.response?.status === 401) {
      return res.status(401).json({ error: "NEWS_API_KEY inválida o sin permisos" });
    }
    return res.status(500).json({ error: "Fallo consultando noticias" });
  }
}
