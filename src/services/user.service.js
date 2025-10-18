import pool from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from "bcrypt";

export const registerUser = async (userData) => {
  const { username, email, password } = userData;
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    const newUser = await getUserById(result.insertId);
    return newUser;
  } catch (error) {
    if (error.code === "ERR_DUP_ENTRY") {
      throw new ApiError(409, "User already exists");
    }
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const { username, email } = userData;
    const [result] = await pool.query(
      "INSERT INTO users (username, email, createdAt) VALUES (?, ?, NOW())",
      [username, email]
    );
    if (result.affectedRows === 0) {
      throw new ApiError(404, "User not found");
    }

    return { id: result.insertId, username, email };
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new ApiError(409, "User already exists");
    }

    throw error;
  }
};

export const getUserById = async (id) => {
  const [rows] = await pool.query(
    "SELECT id, username, email, createdAt FROM users WHERE id = ?",
    [id]
  );
  if (rows.length === 0) {
    throw new ApiError(404, "User not found");
  }
  return rows[0];
};

export const getAllUsers = async () => {
  const [users] = await pool.query(
    "SELECT id, username, email, createdAt FROM users"
  );
  return users;
};

export const getPostsByUser = async (userId) => {
  const [posts] = await pool.query("SELECT * FROM posts WHERE authorId = ?", [
    userId,
  ]);
  if (!posts) {
    throw new ApiError(404, "No posts found for this user.");
  }
  return posts;
};
