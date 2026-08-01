import type { Request, Response } from "express";
import healthService from "./health.service.js";

const healthCheck = (_req: Request, res: Response) => {
  const data = healthService.getHealthStatus();

  res.status(200).json(data);
};

export default {
  healthCheck,
};