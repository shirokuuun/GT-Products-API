import { Router } from "express";
import * as postController from "../controllers/post.controller.js";
import * as commentController from "../controllers/comment.controller.js";
import {
  validatePost,
  validateComment,
} from "../middlewares/validator.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @openapi
 * /posts:
 *   get:
 *     summary: Retrieve all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of all posts
 */
router.get("/", postController.getAllPosts);

/**
 * @openapi
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 description: Post title
 *               content:
 *                 type: string
 *                 description: Post content
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, validatePost, postController.createPost);

/**
 * @openapi
 * /posts/{id}:
 *   get:
 *     summary: Get a single post by ID
 *     tags: [Posts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *       404:
 *         description: Post not found
 */
router.get("/:id", postController.getPostById);

/**
 * @openapi
 * /posts/{id}:
 *   patch:
 *     summary: Partially update a post by ID
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Post not found
 */
router.patch("/:id", postController.partiallyUpdatePost);

/**
 * @openapi
 * /posts/{id}:
 *   put:
 *     summary: Fully update a post by ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
router.put("/:id", authMiddleware, validatePost, postController.updatePost);

/**
 * @openapi
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, not the owner
 *       404:
 *         description: Post not found
 */
router.delete("/:id", authMiddleware, postController.deletePost);

export default router;
