import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { likeValidation } from "./like.validation";
import { likeController } from "./like.controller";

const route = Router();

// API endpoint for like blog.
route.post("/like", validateRequest(likeValidation.likeSchema), likeController.Like);

// API endpoint for unlike blog.
route.delete("/unlike/:id", likeController.unLike);

export const likeRoutes = route;