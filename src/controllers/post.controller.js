import * as postService from "../services/post.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "express-async-handler";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    return res
      .status(200)
      .json(new ApiResponse(200, posts, "Posts retrieved successfully"));
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving posts",
      error: error.message,
    });
  }
};

export const getPostById = asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = await postService.getPostById(postId);

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post retrieved successfully"));
});

export const createPost = async (req, res) => {
  const authorId = req.user.id;
  const postData = req.body;

  try {
    const newPost = await postService.createPost(postData, authorId);
    res
      .status(201)
      .json(new ApiResponse(201, newPost, "Post created successfully"));
  } catch (error) {
    res.status(500).json({
      message: "Error creating post",
      error: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = parseInt(req.params.id, 10);
    const updatedPost = await postService.updatePost(postId, req.body);
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found." });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({
      message: "Error updating post",
      error: error.message,
    });
  }
};

export const partiallyUpdatePost = async (req, res) => {
  try {
    const postId = parseInt(req.params.id, 10);
    const updatedPost = await postService.partiallyUpdatePost(postId, req.body);
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found." });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({
      message: "Error partially updating post",
      error: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = parseInt(req.params.id, 10);
    const success = await postService.deletePost(postId);
    if (!success) {
      return res.status(404).json({ message: "Post not found." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Error deleting post",
      error: error.message,
    });
  }
};
