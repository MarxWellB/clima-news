# Weather + News Dashboard

Full-stack (Node/Express + React/Vite/Tailwind) que combina **clima** (OpenWeather) con **noticias** (NewsAPI/GNews).

## Stack
- Backend: Node.js, Express, Axios, dotenv, CORS
- Frontend: React + Vite + Tailwind v4
- APIs: OpenWeatherMap, NewsAPI/GNews
<img width="970" height="923" alt="image" src="https://github.com/user-attachments/assets/baa6af1e-aac5-42dc-93da-94049bde4067" />

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
