import { Router } from "express";
import upload from "../../middleware/handleUpload";
import bodyParser from "../../middleware/bodyParser";
import { blogController } from "./blog.controller";
import validateRequest from "../../middleware/validateRequest";
import { blogValidation } from "./blog.validation";
import verifyToken from "../../middleware/verifyToken";

const router = Router();

// Endpoint for create blog. Handles image upload, validates request body, and creates a new blog.
router.post("/create-blog", verifyToken("admin"), upload.single("image"), bodyParser, validateRequest(blogValidation.createBlogSchema), blogController.createBlog);

// Endpoint for get all blog.
router.get("/get-all-blog", verifyToken("admin"), blogController.getAllBlog);

// Endpoint for get blog by ID.
router.get("/get-blog/:id", verifyToken("admin"), blogController.getBlog);

// Endpoint for update blog. Handles image upload, validates request body, and updates a blog.
router.patch("/update-blog", verifyToken("admin"), upload.single("image"), bodyParser, validateRequest(blogValidation.updateBlogSchema), blogController.updateBlog);

// Endpoint for delete blog by ID.
router.delete("/delete-blog/:id", verifyToken("admin"), blogController.deleteBlog);

export const blogRoutes = router;