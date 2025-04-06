import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { commentValidation } from "./comment.validation";
import { commentController } from "./comment.controller";

const router = Router();

// API endpoint for creating a comment for blog
router.post("/create-comment", validateRequest(commentValidation.createCommentSchema), commentController.createComment);

// API endpoint for get all comment for blog
router.get("/get-all-comment/:id", commentController.getAllComment);

// API endpoint for updating comment for blog
router.patch("/update-comment", validateRequest(commentValidation.updateCommentSchema), commentController.updateComment);

// API endpoint for deleting comment for blog
router.delete("/delete-comment/:id", commentController.deleteComment);

export const commentRoutes = router;