import { z } from "zod";

const authUserVerifyingSchema = z.object({
  body: z.object({
    email: z.string().email(),
    otp: z.string().length(6),
  }),
});

const authSignInSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const authValidation = {
  authUserVerifyingSchema,
  authSignInSchema,
};
