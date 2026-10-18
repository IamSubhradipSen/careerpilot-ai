import { Router } from "express";
import atsController from "./ats.controller.js";
import authMiddleware from "../../shared/middleware/auth.middleware.js";
const router = Router();
router.post("/", authMiddleware, (req, res) => atsController.createATSAnalysis(req, res));
router.get("/", authMiddleware, (req, res) => atsController.getUserATSAnalyses(req, res));
router.get("/:id", authMiddleware, (req, res) => atsController.getATSAnalysisById(req, res));
router.delete("/:id", authMiddleware, (req, res) => atsController.deleteATSAnalysis(req, res));
export default router;
