import { z } from "zod";

const commentSchema = z.object({
    body: z.object({
        comment: z.string(),
        blog: z.string(),
        user: z.string(),
    })
});

const updateCommentSchema = z.object({
    body: z.object({
        id: z.string(),
        comment: z.string(),
    })
});

export const commentValidation = {
    commentSchema,
    updateCommentSchema,
}