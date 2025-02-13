import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controller";

const router = Router();

// Endpoint for new user verification with OTP.
router.post("/verify-otp-for-new-user", validateRequest(authValidation.userVerifyAuthSchema), authController.verifyOtpForNewUser);

// Endpoint for user sign-in.
router.post("/sign-in", validateRequest(authValidation.signInAuthSchema), authController.signIn);

// Endpoint for refresh token to create new validate JWT access token.
router.post("/refresh-token", validateRequest(authValidation.refreshTokenAuthSchema), authController.refreshToken);

// Endpoint for forget password.
router.post("/forget-password/:email", authController.forgetPassword);

//  Endpoint for verify OTP.
router.post("/verify-otp", authController.verifyOtp);

// Endpoint for reset password.
router.post("/reset-password", authController.resetPassword);

export const authRoutes = router;
