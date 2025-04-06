import { z } from "zod";

const adminCreateBlogSchema = z.object({
    body: z.object({
        title: z.string(),
        content: z.string(),
        author: z.string(),
        category: z.string(),
    })
});

const adminUpdateBlogSchema = z.object({
    body: z.object({
        id: z.string(),
        data: z.object({
            title: z.string(),
            content: z.string(),
            category: z.string(),
        }),
    })
});

export const blogValidation = {
    adminCreateBlogSchema,
    adminUpdateBlogSchema,
}