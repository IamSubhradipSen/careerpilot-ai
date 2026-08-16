import { z } from "zod";
import { createPortfolioSchema } from "./portfolio.validation.js";

export type CreatePortfolioDto =
  z.infer<typeof createPortfolioSchema>;