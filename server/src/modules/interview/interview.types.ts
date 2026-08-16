import { z } from "zod";
import { createInterviewSchema } from "./interview.validation.js";

export type CreateInterviewDto = z.infer<typeof createInterviewSchema>;