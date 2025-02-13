import { z } from "zod";

const userVerifyAuthSchema = z.object({
  body: z.object({
    email: z.string().email(),
    otp: z.string().length(6),
  }),
});

const signInAuthSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

const refreshTokenAuthSchema = z.object({
  cookies: z.object({
    refreshToken: z.string(),
  }),
});

export const authValidation = {
  userVerifyAuthSchema,
  signInAuthSchema,
  refreshTokenAuthSchema,
};
