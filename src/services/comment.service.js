import pool from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";

export const getAllComments = async () => {
  const [rows] = await pool.query("SELECT * FROM comments");
  if (!rows) {
    throw new ApiError(404, "Comments not found");
  }
  return rows;
};

export const getCommentById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM comments WHERE id = ?", [id]);
  if (rows.length === 0) {
    throw new ApiError(404, "User comment not found");
  }
  return rows[0];
};

export const createComment = async (commentData) => {
  try {
    const { text, authorId, postId } = commentData;
    const [result] = await pool.query(
      "INSERT INTO comments (text, authorId, postId) VALUES (?, ?, ?)",
      [text, authorId, postId]
    );

    if (result.affectedRows === 0) {
      throw new ApiError(500, "Failed to create comment.");
    }
  } catch (error) {
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      throw new ApiError(400, "Invalid authorId or postId.");
    }
    throw error;
  }
};
