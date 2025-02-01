import { Router } from "express";
import upload from "../../middleware/handleUpload";
import bodyParser from "../../middleware/bodyParser";
import { blogController } from "./blog.controller";
import validateRequest from "../../middleware/validateRequest";
import { blogValidation } from "./blog.validation";

const router = Router();

// Endpoint for create blog. Handles image upload, validates request body, and creates a new blog.
router.post("/create-blog", upload.single("image"), bodyParser, validateRequest(blogValidation.createBlogSchema), blogController.createBlog);

// Endpoint for get all blog.
router.get("/get-all-blog", blogController.getAllBlog);

// Endpoint for get blog by ID.
router.get("/get-blog/:id", blogController.getBlogById);

// router.put("/update-blog", upload.single("image"), bodyParser, validateRequest(blogValidation.updateBlogSchema), blogController.getBlogById);

export const blogRoutes = router;