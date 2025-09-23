import { Router } from "express";
import { validateComment } from "../middlewares/validator.middleware.js";
import * as commentController from "../controllers/comment.controller.js";

const router = Router();

router.get("/", commentController.getAllComments);
router.get("/:id", commentController.getCommentsByPostId);
router.post("/", validateComment, commentController.createComment);

export default router;
