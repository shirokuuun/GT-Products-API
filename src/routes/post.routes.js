import { Router } from "express";
import { validatePost } from "../middlewares/validator.middleware.js";
import { validateComment } from "../middlewares/validator.middleware.js";
import * as postController from "../controllers/post.controller.js";
import * as commentController from "../controllers/comment.controller.js";

const router = Router();

router.get("/", postController.getAllPosts);
router.post("/", validatePost, postController.createPost);
router.post(
  "/:postId/comments",
  validateComment,
  commentController.createComment
);
router.get("/:postId/comments", commentController.getCommentsByPostId);
router.get("/:id", postController.getPostById);
router.put("/:id", validatePost, postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/:id", postController.updatePost);

export default router;
