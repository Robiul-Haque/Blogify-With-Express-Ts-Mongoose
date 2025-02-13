import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { commentValidation } from "./comment.validation";
import { commentController } from "./comment.controller";
import auth from "../../middleware/auth";

const route = Router();

// API endpoint for creating a comment for blog
route.post("/create-comment", auth("admin"), validateRequest(commentValidation.createCommentSchema), commentController.createComment);

// API endpoint for get all comment for blog
route.get("/get-all-comment/:id", auth("admin"), commentController.getAllComment);

// API endpoint for updating comment for blog
route.patch("/update-comment", auth("admin"), validateRequest(commentValidation.updateCommentSchema), commentController.updateComment);

// API endpoint for deleting comment for blog
route.delete("/delete-comment/:id", auth("admin"), commentController.deleteComment);

export const commentRoutes = route;