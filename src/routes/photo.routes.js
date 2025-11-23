import { Router } from "express";
import * as photoController from "../controllers/photo.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

// All photo routes require authentication
router.use(authMiddleware);

/**
 * @openapi
 * /photos:
 *   get:
 *     summary: Get all photos of the authenticated user
 *     tags: [Photos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user photos
 *       401:
 *         description: Unauthorized
 */
router.get("/", photoController.getUserPhotos);

/**
 * @openapi
 * /photos/upload:
 *   post:
 *     summary: Upload a new photo
 *     tags: [Photos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       201:
 *         description: Photo uploaded successfully
 *       400:
 *         description: Bad request / Invalid file
 *       401:
 *         description: Unauthorized
 */
router.post("/upload", upload.single("photo"), photoController.uploadPhoto);

/**
 * @openapi
 * /photos/{id}:
 *   delete:
 *     summary: Delete a photo by ID
 *     tags: [Photos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Photo ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Photo deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden, not the owner
 *       404:
 *         description: Photo not found
 */
router.delete("/:id", photoController.deleteUserPhoto);

export default router;
