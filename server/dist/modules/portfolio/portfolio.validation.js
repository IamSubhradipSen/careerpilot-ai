import { z } from "zod";
export const createPortfolioSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    projectUrl: z.string().url(),
    githubUrl: z.string().url(),
    liveUrl: z.string().url(),
    imageUrl: z.string().url(),
});
