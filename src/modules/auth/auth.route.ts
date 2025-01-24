import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controller";

const router = Router();

// API endpoint for auth

// Endpoint for new user verification with OTP
router.post("/verify-otp-for-new-user", validateRequest(authValidation.authUserVerifyingSchema), authController.verifyOtpForNewUser);

export const authRoutes = router;