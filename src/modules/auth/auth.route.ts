import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controller";

const router = Router();

// Endpoint for new user verification with OTP.
router.post(
  "/verify-otp-for-new-user",
  validateRequest(authValidation.authUserVerifyingSchema),
  authController.verifyOtpForNewUser
);

// Endpoint for user sign-in.
router.post(
  "/sign-in",
  validateRequest(authValidation.authSignInSchema),
  authController.signIn
);

// Endpoint for refreshing JWT token.
router.post("/refresh-token", authController.refreshToken);

// Endpoint for forgeting password.
router.post("/forget-password/:email", authController.forgetPassword);

//  Endpoint for verifying otp.
router.post("/verify-otp", authController.verifyOtp);

// Endpoint for resetting password
router.post('/reset-password', authController.resetPassword);

export const authRoutes = router;
