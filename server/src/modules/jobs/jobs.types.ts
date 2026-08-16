import { z } from "zod";
import {
  createJobSchema,
  updateJobSchema,
} from "./jobs.validation.js";

export type CreateJobDto = z.infer<typeof createJobSchema>;

export type UpdateJobDto = z.infer<typeof updateJobSchema>;