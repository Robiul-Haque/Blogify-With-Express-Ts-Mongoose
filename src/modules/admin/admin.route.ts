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

// Endpoint to update user blocked status in the database.
router.patch("/update-user-blocked", validateRequest(adminValidation.updateUserBlockedSchema), adminController.updateUserBlocked);

// Endpoint to delete a user from the database.
router.delete("/delete-user/:id", adminController.deleteUser);

export const adminRoutes = router;