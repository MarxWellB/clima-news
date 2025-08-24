# Weather + News Dashboard

Full-stack (Node/Express + React/Vite/Tailwind) que combina **clima** (OpenWeather) con **noticias** (NewsAPI/GNews).

## Stack
- Backend: Node.js, Express, Axios, dotenv, CORS
- Frontend: React + Vite + Tailwind v4
- APIs: OpenWeatherMap, NewsAPI/GNews

## Ejecutar en local
```bash
# Backend
cp .env.example .env   # rellena tus keys
npm i
npm run dev            # http://localhost:3000

# Frontend
cd frontend
cp .env.example .env   # VITE_API_BASE=http://localhost:3000
npm i
npm run dev            # http://localhost:5173
