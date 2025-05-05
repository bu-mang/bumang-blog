import { z } from "zod";

export const loginFormSchema = z.object({
  username: z.string().email("Please enter a valid email"),
  password: z.string().min(4, "Password must be at least 4 characters long"),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
