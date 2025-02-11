import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { commentValidation } from "./comment.validation";
import { commentController } from "./comment.controller";
import verifyToken from "../../middleware/verifyToken";

const route = Router();

// API endpoint for creating a comment for blog
route.post("/create-comment", verifyToken("admin"), validateRequest(commentValidation.createCommentSchema), commentController.createComment);

// API endpoint for get all comment for blog
route.get("/get-all-comment/:id", verifyToken("admin"), commentController.getAllComment);

// API endpoint for updating comment for blog
route.patch("/update-comment", verifyToken("admin"), validateRequest(commentValidation.updateCommentSchema), commentController.updateComment);

// API endpoint for deleting comment for blog
route.delete("/delete-comment/:id", verifyToken("admin"), commentController.deleteComment);

export const commentRoutes = route;