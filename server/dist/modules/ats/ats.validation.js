import { z } from "zod";
export const createATSAnalysisSchema = z.object({
    resumeId: z.string().min(1, "Resume ID is required"),
    jobDescription: z
        .string()
        .trim()
        .min(30, "Job description must contain at least 30 characters")
        .max(15000, "Job description is too long"),
});
