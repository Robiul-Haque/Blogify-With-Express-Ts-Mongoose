import { Router } from "express";
import { adminController } from "./admin.controller";
import upload from "../../middleware/handleUpload";
import validateRequest from "../../middleware/validateRequest";
import bodyParser from "../../middleware/bodyParser";
import { adminValidation } from "./admin.validation";
import verifyToken from "../../middleware/verifyToken";

const router = Router();

// Endpoint to get admin from the database.
router.get("/get-dashoard-statics", verifyToken("admin"), adminController.getDashboardStatics);

// Endpoint to get admin from the database.
router.get("/get-admin", verifyToken("admin"), adminController.getAdmin);

// Endpoint to update admin from the database.
router.patch("/update-admin", verifyToken("admin"), upload.single("image"), bodyParser, validateRequest(adminValidation.updateAdminSchema), adminController.updateAdmin);

// Endpoint to get all users from the database.
router.get("/get-all-user", verifyToken("admin"), adminController.getAllUser);

// Endpoint to update user blocked status in the database.
router.patch("/update-user-blocked", verifyToken("admin"), validateRequest(adminValidation.updateUserBlockedSchema), adminController.updateUserBlocked);

// Endpoint to delete a user from the database.
router.delete("/delete-user/:id", verifyToken("admin"), adminController.deleteUser);

export const adminRoutes = router;