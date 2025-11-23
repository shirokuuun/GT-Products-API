import { Router } from "express";
import * as commentController from "../controllers/comment.controller.js";
import { validateComment } from "../middlewares/validator.middleware.js";

const router = Router();

/**
 * @openapi
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - postId
 *               - text
 *               - authorId
 *             properties:
 *               postId:
 *                 type: integer
 *                 description: ID of the post being commented on
 *               text:
 *                 type: string
 *                 description: Text of the comment
 *               authorId:
 *                 type: integer
 *                 description: ID of the comment author
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", validateComment, commentController.createComment);

/**
 * @openapi
 * /comments:
 *   get:
 *     summary: Retrieve all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of all comments
 */
router.get("/", commentController.getAllComments);

/**
 * @openapi
 * /comments/post/{postId}:
 *   get:
 *     summary: Retrieve comments for a specific post
 *     tags: [Comments]
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of comments for the post
 *       404:
 *         description: Post not found
 */
router.get("/post/:postId", commentController.getCommentsByPostId);

export default router;
