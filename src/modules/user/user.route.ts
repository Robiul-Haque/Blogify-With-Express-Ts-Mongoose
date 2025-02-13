import { Router } from "express";
import upload from "../../middleware/handleUpload";
import bodyParser from "../../middleware/bodyParser";
import validateRequest from "../../middleware/validateRequest";
import { userValidation } from "./user.validation";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();

// Endpoint for user registration database.
router.post("/sign-up", upload.single('image'), bodyParser, validateRequest(userValidation.createUserSchema), userController.signUp);

// Endpoint to get admin dashbord statics from the database.
router.get("/get-admin-dashboard-statics", auth("admin"), userController.getAdminDashboardStatics);

// Endpoint to get admin from the database.
router.get("/get-admin", auth("admin"), userController.getAdmin);

// Endpoint to update admin from the database.
router.patch("/update-admin-info", auth("admin"), upload.single("image"), bodyParser, validateRequest(userValidation.updateAdminSchema), userController.updateAdmin);

// Endpoint to get all users without admin from the database.
router.get("/get-all-user", auth("admin"), userController.getAllUser);

// Endpoint to update user blocked status in the database.
router.patch("/user-blocked", auth("admin"), validateRequest(userValidation.userBlockedSchema), userController.userBlocked);

// Endpoint to delete a user from the database.
router.delete("/delete-user/:id", auth("admin"), userController.deleteUser);

export const userRoutes = router;