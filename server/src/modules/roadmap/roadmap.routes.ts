import { Router } from "express";
import roadmapController from "./roadmap.controller.js";
import authMiddleware from "../../shared/middleware/auth.middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  (req, res) => roadmapController.createRoadmap(req, res)
);

router.get(
  "/",
  authMiddleware,
  (req, res) => roadmapController.getUserRoadmaps(req, res)
);

export default router;