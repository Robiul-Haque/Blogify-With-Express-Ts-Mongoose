import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { likeValidation } from "./like.validation";
import { likeController } from "./like.controller";
import verifyToken from "../../middleware/verifyToken";

const route = Router();

// API endpoint for like blog.
route.post("/like", verifyToken("admin"), validateRequest(likeValidation.likeSchema), likeController.Like);

// API endpoint for unlike blog.
route.delete("/unlike/:id", verifyToken("admin"), likeController.unLike);

export const likeRoutes = route;