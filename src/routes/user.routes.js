import { Router } from "express";
import * as userController from "../controllers/user.controller.js";

const router = Router();

router.get("/:id", userController.getUserById);
router.get("/", userController.getAllUsers);
router.get("/:userId/posts", userController.getPostsByUser);
router.post("/", userController.createUser);

export default router;
