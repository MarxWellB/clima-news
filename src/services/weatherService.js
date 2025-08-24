import axios from "axios";

const API_KEY = "858eb3e76fb1f7568df38793a18598f0"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeather(city) {
    const { data } = await axios.get(BASE_URL, {
      params: { q: city, appid: API_KEY, units: "metric", lang: "es" },
    });
    return data;
  }
