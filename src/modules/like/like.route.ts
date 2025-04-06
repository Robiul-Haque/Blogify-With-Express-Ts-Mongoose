import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { likeValidation } from "./like.validation";
import { likeController } from "./like.controller";

const router = Router();

// API endpoint for like blog.
router.post("/like", validateRequest(likeValidation.likeSchema), likeController.Like);

// API endpoint for unlike blog.
router.delete("/unlike/:id", likeController.unLike);

// API endpoint for get all like.
router.get("/get-all-like", likeController.getAllLike);

// API endpoint for delete like.
router.delete("/delete-like/:id", likeController.deleteLike);

export const likeRoutes = router;