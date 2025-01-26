import { z } from "zod";

const updateAdminSchema = z.object({
    body: z.object({
        id: z.string(),
        name: z.string(),
    })
});

export const adminValidation = {
    updateAdminSchema,
}