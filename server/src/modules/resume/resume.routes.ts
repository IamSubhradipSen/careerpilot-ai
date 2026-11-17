
import { Router } from "express";
import resumeController from "./resume.controller.js";
import authMiddleware from "../../shared/middleware/auth.middleware.js";
import resumeUpload from "./resume.upload.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  resumeUpload.single("resume"),
  (req, res) => resumeController.createResume(req, res)
);

router.get(
  "/",
  authMiddleware,
  (req, res) => resumeController.getUserResumes(req, res)
);

export default router;
