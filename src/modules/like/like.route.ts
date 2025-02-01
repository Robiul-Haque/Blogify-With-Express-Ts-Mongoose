import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { likeValidation } from "./like.validation";
import { likeController } from "./like.controller";

const route = Router();

route.post("/create-like", validateRequest(likeValidation.likeSchema), likeController.createLike);

export const likeRoutes = route;