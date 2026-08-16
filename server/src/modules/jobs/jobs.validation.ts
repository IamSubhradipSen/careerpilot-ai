import { z } from "zod";

export const createJobSchema = z.object({
  company: z.string().min(1, "Company is required"),

  role: z.string().min(1, "Role is required"),

  status: z.enum([
    "Applied",
    "Interview",
    "Rejected",
    "Offer",
  ]),

  location: z.string().optional(),

  jobUrl: z.string().url().optional(),

  notes: z.string().optional(),
});

export const updateJobSchema = createJobSchema.partial();