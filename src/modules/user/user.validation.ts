import { z } from "zod";

const createUserSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(5).max(20),
    })
});

export const userValidation = {
    createUserSchema
}