import { Router } from "express";
import { combinedHandler } from "../controllers/combinedController.js";
const router = Router();
router.get("/", combinedHandler);
export default router;
