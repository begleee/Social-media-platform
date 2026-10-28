import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().trim()
        .min(3, "Name length must be at least 3 characters")
        .max(15, "Name length must be less than 15 character"),
    email: z.email("Invalid email format"),
    password: z.string()
        .min(8, "Password length must be at least 8 characters")
        .max(20, "Password length must be less that 20 characters")
});

export const loginSchema = z.object({
    email: z.email("Invalid email format"),
    password: z.string()
        .min(8, "Password length must be at least 8 characters")
        .max(20, "Password length must be less that 20 characters")
});

export const forgotPasswordSchmea = z.object({
    email: z.email("Invalid email format")
});
