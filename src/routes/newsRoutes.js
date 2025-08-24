import { Router } from "express";
import { newsHandler } from "../controllers/newsController.js";
const router = Router();
router.get("/", newsHandler);
export default router;
