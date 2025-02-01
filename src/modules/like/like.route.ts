import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { likeValidation } from "./like.validation";
import { likeController } from "./like.controller";

const route = Router();

route.post("/like", validateRequest(likeValidation.likeSchema), likeController.Like);

route.delete("/unlike/:id", likeController.unLike);

export const likeRoutes = route;