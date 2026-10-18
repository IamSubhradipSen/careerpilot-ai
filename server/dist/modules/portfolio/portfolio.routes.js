import { Router } from "express";
import portfolioController from "./portfolio.controller.js";
import authMiddleware from "../../shared/middleware/auth.middleware.js";
const router = Router();
router.post("/", authMiddleware, (req, res) => portfolioController.createPortfolio(req, res));
router.get("/", authMiddleware, (req, res) => portfolioController.getUserPortfolios(req, res));
export default router;
