import { Router } from "express";
import { listCities, searchCities } from "../controllers/citiesController.js";
const router = Router();
router.get("/", listCities);
router.get("/search", searchCities);
export default router;