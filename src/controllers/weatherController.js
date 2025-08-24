import axios from "axios";
import { mapWeatherResponse } from "../utils/mappers.js";
import { normalizeCity } from "../utils/cities.js";

export async function weatherHandler(req, res) {
  try {
    let { city, units = "metric", lang = "es", country = "SV" } = req.query;
    if (!city) return res.status(400).json({ error: "Debes proporcionar una ciudad" });

    const API_KEY = process.env.OWM_API_KEY;
    if (!API_KEY) return res.status(500).json({ error: "Falta OWM_API_KEY en el .env" });

    const q = normalizeCity(city, country);
    const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: { q, appid: API_KEY, units, lang },
      timeout: 10000,
    });

    return res.json(mapWeatherResponse(data));
  } catch (err) {
    const code = err.response?.status;
    const body = err.response?.data;
    if (code === 401) return res.status(401).json({ error: "API key inválida o no activa en OpenWeather" });
    if (code === 404) return res.status(404).json({ error: "Ciudad no encontrada" });
    return res.status(500).json({ error: "Fallo consultando OpenWeather", detalle: body?.message || err.message });
  }
}
