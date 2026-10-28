import { z } from "zod";

const createPostSchema = z.object({
    title: z.string()
        .min(7, "Title length must be at least 7 characters" )
        .max(25, "Title length must be less than 25 characters" ).optional(),
    details: z.string()
        .max(100, "Details lentgth must be less than 100 characters" )
        .optional()
});

const updatePostSchema = z.object({
    title: z.string()
    .min(7, "Title length must be at least 7 characters" )
    .max(25, "Title length must be less than 25 characters" )
    .optional(),
    details: z.string()
        .max(100, "Details lentgth must be less than 100 characters" )
        .optional()
}).refine(data => Object.keys(data).length > 0, 
    "At least one field must be provided for update"
);

const postIdSchema = z.object({
    id: z.uuid("Invalid post ID format")
});

export { createPostSchema, updatePostSchema, postIdSchema };
