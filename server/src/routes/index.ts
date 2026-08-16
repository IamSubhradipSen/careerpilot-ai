import { Router } from "express";

console.log("🚀 Loading routes...");

import healthRoutes from "../modules/health/health.routes.js";
console.log("✅ health imported");

import authRoutes from "../modules/auth/auth.routes.js";
console.log("✅ auth imported");

import resumeRoutes from "../modules/resume/resume.routes.js";
console.log("✅ resume imported");

import portfolioRoutes from "../modules/portfolio/portfolio.routes.js";
console.log("✅ portfolio imported");

import roadmapRoutes from "../modules/roadmap/roadmap.routes.js";
console.log("✅ roadmap imported");

import interviewRoutes from "../modules/interview/interview.routes.js";
console.log("✅ interview imported");

import jobsRoutes from "../modules/jobs/jobs.routes.js";
console.log("✅ jobs imported");

import atsRoutes from "../modules/ats/ats.routes.js";
console.log("✅ ats imported");

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/resume", resumeRoutes);
router.use("/portfolio", portfolioRoutes);
router.use("/roadmap", roadmapRoutes);
router.use("/interview", interviewRoutes);
router.use("/jobs", jobsRoutes);
router.use("/ats", atsRoutes);

console.log("✅ All routes registered");

export default router;