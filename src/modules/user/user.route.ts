import { Router } from "express";
import upload from "../../middleware/handleUpload";
import bodyParser from "../../middleware/bodyParser";
import validateRequest from "../../middleware/validateRequest";
import { userValidation } from "./user.validation";
import { userController } from "./user.controller";

const router = Router();

// Endpoint for user registration. Handles image upload, validates request body, and creates a new user.
router.post("/sign-up", upload.single('image'), bodyParser, validateRequest(userValidation.createUserSchema), userController.signUp);

export const userRoutes = router;