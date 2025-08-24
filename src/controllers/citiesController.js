import list from "../data/cities.json" with  { type: "json" };

export function listCities(_req, res) {
    res.json(list);
  }
  
  export function searchCities(req, res) {
    const q = (req.query.q || "").toLowerCase().trim();
    if (!q) return res.json(list.slice(0, 10));
    const out = list
      .filter(c =>
        c.name.toLowerCase().includes(q) ||
        (c.country || "").toLowerCase().includes(q)
      )
      .slice(0, 20);
    res.json(out);
  }