import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import weatherRoutes from "./routes/weatherRoutes.js"; 
import citiesRoutes from "./routes/citiesRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import combinedRoutes from "./routes/combinedRoutes.js";


dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;
app.use("/api/cities", citiesRoutes);
app.use(cors());
app.use(express.json());app.use("/api/news", newsRoutes);
app.use("/api/combined", combinedRoutes);
app.use("/api/weather", weatherRoutes);  

app.get("/", (_req, res) => {
  res.send("🌦️ API Clima-News funcionando...");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});