import asyncHandler from "express-async-handler";
import * as commentService from "../services/comment.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAllComments = asyncHandler(async (req, res) => {
  const comments = await commentService.getAllComments(req.body);
  return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully"));
});

export const getCommentsByPostId = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const comments = await commentService.getCommentsByPostId(postId);
  return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully"));
});

export const createComment = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.postId, 10);
  const { text, authorId } = req.body;
  const newComment = await commentService.createComment({
    text,
    authorId,
    postId,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, newComment, "Comment created successfully"));
});
