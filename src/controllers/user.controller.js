import asyncHandler from "express-async-handler";
import * as userService from "../services/user.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createUser = asyncHandler(async (req, res) => {
  const newUser = await userService.createUser(req.body);
  return res
    .status(201)
    .json(new ApiResponse(201, newUser, "User created successfully"));
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User retrieved successfully"));
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();
  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users retrieved successfully"));
});
