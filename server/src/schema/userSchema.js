import { z } from "zod";

export const updateUserSchema = z.object({
    name: z.string()
        .min(3, "Name length must be at least 3 characters")
        .max(15, "Name length must be less than 15 character"),
});
