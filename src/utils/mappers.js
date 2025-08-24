export function mapWeatherResponse(owm) {
  if (!owm) return null;
  const w = owm.weather?.[0] || {};
  const m = owm.main || {};
  const wind = owm.wind || {};
  const sys = owm.sys || {};

  return {
    ciudad: owm.name,
    pais: sys.country,
    coord: { lat: owm.coord?.lat, lon: owm.coord?.lon },
    clima: {
      codigo: w.id,
      estado: w.main,           // "Clouds", "Rain", etc.
      descripcion: w.description, // "algo de nubes"
      icono: w.icon,              // "02d"
    },
    temp: {
      actual: m.temp,
      sensacion: m.feels_like,
      min: m.temp_min,
      max: m.temp_max,
      humedad: m.humidity,
      presion: m.pressure,
    },
    viento: {
      velocidad: wind.speed,
      direccion: wind.deg,
    },
    sol: {
      amanecer: sys.sunrise ? new Date(sys.sunrise * 1000).toISOString() : null,
      atardecer: sys.sunset ? new Date(sys.sunset * 1000).toISOString() : null,
    },
    fuente: "openweathermap",
    actualizado: owm.dt ? new Date(owm.dt * 1000).toISOString() : null
  };
}
