import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { commentValidation } from "./comment.validation";
import { commentController } from "./comment.controller";

const route = Router();

// API endpoint for creating a new user
route.post("/create-comment", validateRequest(commentValidation.commentSchema), commentController.createComment);

export const commentRoutes = route;