import { Router } from "express";
import validateRequest from "../../../middleware/validateRequest";
import { likeValidation } from "./like.validation";
import { likeController } from "./like.controller";
import verifyToken from "../../../middleware/verifyToken";

const route = Router();

// API endpoint for like blog.
route.post("/like", verifyToken("admin"), validateRequest(likeValidation.likeSchema), likeController.Like);

// API endpoint for unlike blog.
route.delete("/unlike/:id", verifyToken("admin"), likeController.unLike);

// API endpoint for get all like.
route.get("/get-all-like", verifyToken("admin"), likeController.getAllLike);

// API endpoint for delete like.
route.delete("/delete-like/:id", verifyToken("admin"), likeController.deleteLike);

export const likeRoutes = route;