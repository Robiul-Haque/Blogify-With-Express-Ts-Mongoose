import { z } from "zod";

const likeSchema = z.object({
    body: z.object({
        blog: z.string(),
        user: z.string(),
    })
});

export const likeValidation = {
    likeSchema
};