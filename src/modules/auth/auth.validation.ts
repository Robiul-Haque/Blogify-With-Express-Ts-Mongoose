import { z } from "zod";

const authUserVerifyingSchema = z.object({
    body: z.object({
        email: z.string().email(),
        otp: z.string().length(6)
    })
});

export const authValidation = {
    authUserVerifyingSchema
}