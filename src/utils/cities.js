// Normaliza entrada del usuario: quita espacios extra y añade país si hace falta
export function normalizeCity(input, defaultCountry = "SV") {
  if (!input) return null;
  const s = input.trim().replace(/\s+/g, " ");
  // Si el usuario ya puso ",CC" (código de 2 letras), respétalo
  if (/,[a-zA-Z]{2}$/.test(s)) return s;
  return `${s},${defaultCountry}`; // p.ej. "San Salvador,SV"
}
