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

export const createPost = async (postData, authorId) => {
  const { title, content } = postData;

  try {
    const [result] = await pool.query(
      "INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)",
      [title, content, authorId]
    );
    const newPost = await getPostById(result.insertId);
    return newPost;
  } catch (error) {
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      throw new ApiError(400, "Author ID does not exist.");
    }
    throw error;
  }
};

export const updatePost = async (id, postData, userId) => {
  const { title, content } = postData;

  const post = await getPostById(id);

  if (post.authorId !== userId) {
    throw new ApiError(
      403,
      "Forbidden: You do not have permission to edit this post."
    );
  }

  await pool.query("UPDATE posts SET title = ?, content = ? WHERE id = ?", [
    title,
    content,
    id,
  ]);
  const updatePost = await getPostById(id);
  return updatePost;
};

export const deletePost = async (id, userId) => {
  const post = await getPostById(id);

  if (post.authorId !== userId) {
    throw new ApiError(
      403,
      "Forbidden: You do not have permission to delete this post."
    );
  }

  const [result] = await pool.query("DELETE FROM posts WHERE id = ?", [id]);
  return result.affectedRows;
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
