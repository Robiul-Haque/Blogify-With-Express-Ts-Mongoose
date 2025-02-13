import { z } from "zod";

const createUserSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(5).max(20),
    })
});

const updateAdminSchema = z.object({
    body: z.object({
        id: z.string(),
        name: z.string(),
    })
});

const userBlockedSchema = z.object({
    body: z.object({
        id: z.string(),
        status: z.boolean(),
    })
});

export const userValidation = {
    createUserSchema,
    updateAdminSchema,
    userBlockedSchema,
}