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

// Endpoint to user add bookmark blog in the database.
router.patch("/bookmark/add/blog", auth("user"), validateRequest(userValidation.userBookmarkBlogSchema), userController.addBookmark);

// Endpoint to user remove bookmark blog in the database.
router.patch("/bookmark/remove/blog", auth("user"), validateRequest(userValidation.userBookmarkBlogSchema), userController.removeBookmark);

// Endpoint to get user from the database.
router.get("/get-user/:id", auth("user"), userController.getUser);

// Endpoint to user info update in the database.
router.patch("/update-user-info", auth("user"), upload.single("image"), bodyParser, validateRequest(userValidation.userUpdateInfoSchema), userController.updateUser);

// Endpoint to get user bookmark blog from the database.
router.get("/get-user-bookmark-blog/:id", auth("user"), userController.getUserAllBookmark);

// Endpoint to get user delete bookmark blog from the database.
router.delete("/delete-bookmark-blog", auth("user"), userController.deleteBookmark);


// Endpoint for admin.
// Endpoint to get admin dashboard statics from the database.
router.get("/get-admin-dashboard-statics", auth("admin"), userController.getAdminDashboardStatics);

// Endpoint to get admin from the database.
router.get("/get-admin", auth("admin"), userController.getAdmin);

// Endpoint to update admin from the database.
router.patch("/update-admin-info", auth("admin"), upload.single("image"), bodyParser, validateRequest(userValidation.updateAdminSchema), userController.updateAdmin);

// Endpoint to get all users without admin from the database.
router.get("/admin-get-all-user", auth("admin"), userController.adminGetAllUser);

// Endpoint to update user blocked status in the database.
router.patch("/admin-user-blocked", auth("admin"), validateRequest(userValidation.userBlockedSchema), userController.userBlocked);

// Endpoint to delete a user from the database.
router.delete("/admin-delete-user/:id", auth("admin"), userController.adminDeleteUser);

export const userRoutes = router;