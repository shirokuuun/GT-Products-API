import asyncHandler from "express-async-handler";
import * as commentService from "../services/comment.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAllComments = asyncHandler(async (req, res) => {
  const comments = await commentService.getAllComments(req.body);
  return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully"));
});

export const getCommentById = asyncHandler(async (req, res) => {
  const commentId = parseInt(req.params.id, 10);
  const comment = await commentService.getCommentById(commentId);
  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment fetched successfully"));
});

export const createComment = asyncHandler(async (req, res) => {
  const newComment = await commentService.createComment(req.body);
  return res
    .status(201)
    .json(new ApiResponse(201, newComment, "Comment created successfully"));
});
