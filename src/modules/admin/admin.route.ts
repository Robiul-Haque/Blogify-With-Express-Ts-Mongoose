import { Router } from "express";
import { adminController } from "./admin.controller";

const router = Router();

// Endpoint to get admin from the database.
router.get("/get-admin", adminController.getAdmin);

// Endpoint to get all users from the database.
router.get("/get-all-user", adminController.getAllUser);

export const adminRoutes = router;