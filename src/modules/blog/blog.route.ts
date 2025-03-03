import { Router } from "express";
import upload from "../../middleware/handleUpload";
import bodyParser from "../../middleware/bodyParser";
import { blogController } from "./blog.controller";
import validateRequest from "../../middleware/validateRequest";
import { blogValidation } from "./blog.validation";
import auth from "../../middleware/auth";

const router = Router();


// Blog endpoint for admin.
// Endpoint for admin create blog. Handles image upload, validates request body, and creates a new blog.
router.post("/admin-create-blog", auth("admin"), upload.single("image"), bodyParser, validateRequest(blogValidation.adminCreateBlogSchema), blogController.adminCreateBlog);

// Endpoint for get admin all blog.
router.get("/admin-get-all-blog", auth("admin"), blogController.adminGetAllBlog);

// Endpoint for get admin blog for view by ID.
router.get("/admin-get-blog-for-view/:id", auth("admin"), blogController.adminGetBlogForView);

// Endpoint for get admin blog for update by ID.
router.get("/admin-get-blog-for-update/:id", auth("admin"), blogController.adminGetBlogForUpdate);

// Endpoint for admin update blog, Handles image upload, validates request body, and updates a blog.
router.patch("/admin-update-blog", auth("admin"), upload.single("image"), bodyParser, validateRequest(blogValidation.adminUpdateBlogSchema), blogController.adminUpdateBlog);

// Endpoint for admin delete blog by ID.
router.delete("/admin-delete-blog/:id", auth("admin"), blogController.adminDeleteBlog);


// Client side endpoint for user
// Endpoint for get all published blog.
router.get("/get-all-blog", blogController.getAllBlog);


export const blogRoutes = router;