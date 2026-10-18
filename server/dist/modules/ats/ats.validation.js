import { z } from "zod";
export const createATSAnalysisSchema = z.object({
    resumeId: z.string().min(1, "Resume ID is required"),
    jobDescription: z
        .string()
        .min(10, "Job description is too short"),
    score: z
        .number()
        .int()
        .min(0)
        .max(100),
    matchedSkills: z.array(z.string()).default([]),
    missingSkills: z.array(z.string()).default([]),
    suggestions: z.array(z.string()).default([]),
});
