import { z } from "zod";
import { createATSAnalysisSchema } from "./ats.validation.js";

export type CreateATSAnalysisDto =
  z.infer<typeof createATSAnalysisSchema>;