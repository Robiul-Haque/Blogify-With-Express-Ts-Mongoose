import { Router } from "express";
import { adminController } from "./admin.controller";
import upload from "../../middleware/handleUpload";
import validateRequest from "../../middleware/validateRequest";
import bodyParser from "../../middleware/bodyParser";
import { adminValidation } from "./admin.validation";

const router = Router();

// Endpoint to get admin from the database.
router.get("/get-admin", adminController.getAdmin);

// Endpoint to update admin from the database.
router.patch("/update-admin", upload.single("image"), bodyParser, validateRequest(adminValidation.updateAdminSchema), adminController.updateAdmin);

// Endpoint to get all users from the database.
router.get("/get-all-user", adminController.getAllUser);

export const adminRoutes = router;