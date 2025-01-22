import { Router } from "express";
import upload from "../../middleware/handleUpload";
import bodyParser from "../../middleware/bodyParser";
import validateRequest from "../../middleware/validateRequest";
import { userValidation } from "./user.validation";
import { userController } from "./user.controller";

const router = Router();

// API endpoint for user

// Endpoint for user registration. Handles image upload, validates request body, and creates a new user.
router.post("/sign-up", upload.single('image'), bodyParser, validateRequest(userValidation.userSchema), userController.signUp);

export const userRoutes = router;