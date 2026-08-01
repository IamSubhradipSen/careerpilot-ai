import { z } from "zod";
import { registerSchema, loginSchema } from "./auth.validation.js";

export type RegisterUserDto = z.infer<typeof registerSchema>;
export type LoginUserDto = z.infer<typeof loginSchema>;