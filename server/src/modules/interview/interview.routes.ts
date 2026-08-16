import { Router } from "express";
import interviewController from "./interview.controller.js";
import authMiddleware from "../../shared/middleware/auth.middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  (req, res) => interviewController.createInterview(req, res)
);

router.get(
  "/",
  authMiddleware,
  (req, res) => interviewController.getUserInterviews(req, res)
);

export default router;