import pool from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";

export const getAllPosts = async () => {
  const [posts] = await pool.query(`
    SELECT 
      p.id,
      p.title,
      p.content,
      p.authorId,
      u.username AS authorUsername,
      u.email AS authorEmail
    FROM posts p
    JOIN users u ON p.authorId = u.id
  `);
  return posts.map((post) => ({
    ...post,
    author: {
      id: post.authorId,
      username: post.authorUsername,
      email: post.authorEmail,
    },
  }));
};

export const getPostById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT 
      p.id,
      p.title,
      p.content,
      p.authorId,
      u.username AS authorUsername,
      u.email AS authorEmail
    FROM posts p
    JOIN users u ON p.authorId = u.id
    WHERE p.id = ?
  `,
    [id]
  );

  if (!rows[0]) {
    throw new ApiError(404, "Post not found.");
  }

  const post = rows[0];
  return {
    ...post,
    author: {
      id: post.authorId,
      username: post.authorUsername,
      email: post.authorEmail,
    },
  };
};

export const createPost = async (postData) => {
  try {
    const { title, content, authorId } = postData;
    const [result] = await pool.query(
      "INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)",
      [title, content, authorId]
    );
    const newPostId = result.insertId;
    return getPostById(newPostId);
  } catch (error) {
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      throw new ApiError(400, "Author ID does not exist.");
    }
    throw error;
  }
};

export const updatePost = async (id, postData) => {
  const { title, content } = postData;
  const [result] = await pool.query(
    "UPDATE posts SET title = ?, content = ? WHERE id = ?",
    [title, content, id]
  );
  if (result.affectedRows === 0) {
    throw new ApiError(404, "Post not found.");
  }
  return getPostById(id);
};

export const deletePost = async (id) => {
  const [result] = await pool.query("DELETE FROM posts WHERE id = ?", [id]);
  if (result.affectedRows === 0) {
    throw new ApiError(404, "Post not found.");
  }
  return true;
};

export const partiallyUpdatePost = async (id, updates) => {
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  if (fields.length === 0) {
    return getPostById(id);
  }

  const setClause = fields.map((field) => `${field} = ?`).join(", ");

  const [result] = await pool.query(
    `UPDATE posts SET ${setClause} WHERE id = ?`,
    [...values, id]
  );

  if (result.affectedRows === 0) {
    throw new ApiError(404, "Post not found");
  }
  return getPostById(id);
};
