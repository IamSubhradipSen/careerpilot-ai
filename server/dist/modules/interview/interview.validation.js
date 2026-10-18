import { z } from "zod";
export const createInterviewSchema = z.object({
    jobRole: z.string().min(2),
    difficulty: z.enum(["Easy", "Medium", "Hard"]),
});
