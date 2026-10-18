/*import { Router } from "express";


import jobsController from "./jobs.controller.js";
import authMiddleware from "../../shared/middleware/auth.middleware.js";

console.log("✅ Jobs routes loaded");

const router = Router();

router.post(
  "/",
  authMiddleware,
  (req, res) => jobsController.createJob(req, res)
);

router.get(
  "/",
  authMiddleware,
  (req, res) => jobsController.getUserJobs(req, res)
);

router.put(
  "/:id",
  authMiddleware,
  (req, res) => jobsController.updateJob(req, res)
);

router.delete(
  "/:id",
  authMiddleware,
  (req, res) => jobsController.deleteJob(req, res)
);

export default router;*/
import { Router } from "express";
import jobsController from "./jobs.controller.js";
import authMiddleware from "../../shared/middleware/auth.middleware.js";
console.log("✅ Jobs routes loaded");
const router = Router();
router.post("/", authMiddleware, (req, res) => jobsController.createJob(req, res));
router.get("/", authMiddleware, (req, res) => jobsController.getUserJobs(req, res));
router.put("/:id", authMiddleware, (req, res) => jobsController.updateJob(req, res));
router.delete("/:id", authMiddleware, (req, res) => jobsController.deleteJob(req, res));
export default router;
