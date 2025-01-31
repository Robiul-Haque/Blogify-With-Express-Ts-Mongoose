import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { commentValidation } from "./comment.validation";
import { commentController } from "./comment.controller";

const route = Router();

// API endpoint for creating a comment for blog
route.post("/create-comment", validateRequest(commentValidation.commentSchema), commentController.createComment);

// API endpoint for updating a comment for blog
route.patch("/update-comment", validateRequest(commentValidation.updateCommentSchema), commentController.updateComment);

export const commentRoutes = route;