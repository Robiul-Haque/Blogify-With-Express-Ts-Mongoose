import { z } from "zod";

const createBlogSchema = z.object({
    body: z.object({
        title: z.string(),
        content: z.string(),
        author: z.string(),
        category: z.string(),
    })
});

const updateBlogSchema = z.object({
    body: z.object({
        title: z.string(),
        content: z.string(),
        category: z.string(),
    })
});

export const blogValidation = {
    createBlogSchema,
    updateBlogSchema,
}