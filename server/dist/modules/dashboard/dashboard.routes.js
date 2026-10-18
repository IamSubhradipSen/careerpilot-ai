import { Router } from "express";
import dashboardController from "./dashboard.controller.js";
import authMiddleware from "../../shared/middleware/auth.middleware.js";
const router = Router();
router.get("/", authMiddleware, (req, res) => dashboardController.getOverview(req, res));
export default router;
