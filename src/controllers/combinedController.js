import axios from "axios";
import { mapWeatherResponse } from "../utils/mappers.js";
import { normalizeCity } from "../utils/cities.js";
import { fetchNews } from "../services/newsService.js";

export async function combinedHandler(req, res) {
  try {
    let { city, units = "metric", lang = "es", country = "SV" } = req.query;
    if (!city) return res.status(400).json({ error: "Debes proporcionar una ciudad" });

    const OWM = process.env.OWM_API_KEY;
    if (!OWM) return res.status(500).json({ error: "Falta OWM_API_KEY en .env" });

    const qCity = normalizeCity(city, country);

    const weatherPromise = axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: { q: qCity, appid: OWM, units, lang }, timeout: 10000
    });
    const newsPromise = fetchNews({ q: city, lang, country });

    const [wRes, news] = await Promise.all([weatherPromise, newsPromise]);
    const weather = mapWeatherResponse(wRes.data);

    res.json({
      ciudad: weather?.ciudad,
      pais: weather?.pais,
      clima: weather,
      noticias: news
    });
  } catch (err) {
    console.error("COMBINED error:", err.response?.status, err.response?.data || err.message);
    return res.status(500).json({ error: "Fallo obteniendo datos combinados" });
  }
}
