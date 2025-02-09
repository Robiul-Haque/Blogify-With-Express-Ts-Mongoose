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

const refreshTokenSchema = z.object({
  cookies: z.object({
    refreshToken: z.string(),
  }),
});

export const authValidation = {
  authUserVerifyingSchema,
  authSignInSchema,
  refreshTokenSchema,
};
