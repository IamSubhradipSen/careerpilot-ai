import { z } from "zod";
import { createATSAnalysisSchema } from "./ats.validation.js";

export type CreateATSAnalysisDto = z.infer<
  typeof createATSAnalysisSchema
>;

export interface CreateATSAnalysisRecord extends CreateATSAnalysisDto {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
  userId: string;
}