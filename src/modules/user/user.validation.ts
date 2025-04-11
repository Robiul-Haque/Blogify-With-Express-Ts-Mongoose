import { z } from "zod";

const createUserSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(5).max(20),
    })
});

const userBookmarkBlogSchema = z.object({
    body: z.object({
        blog: z.string(),
        user: z.string(),
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

const userUpdateInfoSchema = z.object({
    body: z.object({
        id: z.string(),
        name: z.string(),
    })
});

export const userValidation = {
    createUserSchema,
    userBookmarkBlogSchema,
    updateAdminSchema,
    userBlockedSchema,
    userUpdateInfoSchema,
}