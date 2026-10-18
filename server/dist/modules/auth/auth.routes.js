import { Router } from "express";
import authController from "./auth.controller.js";
import authMiddleware from "../../shared/middleware/auth.middleware.js";
const router = Router();
console.log("✅ Auth routes loaded");
router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));
router.get("/profile", authMiddleware, (req, res) => authController.me(req, res));
export default router;
