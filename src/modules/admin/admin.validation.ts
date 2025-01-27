import { z } from "zod";

// Update admin schema object with zod for incoming data validation.
const updateAdminSchema = z.object({
    body: z.object({
        id: z.string(),
        name: z.string(),
    })
});

// Update user schema object with zod for incoming data validation.
const updateUserBlockedSchema = z.object({
    body: z.object({
        id: z.string(),
        status: z.boolean(),
    })
});

export const adminValidation = {
    updateAdminSchema,
    updateUserBlockedSchema,
}