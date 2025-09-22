import pool from "../config/db.js";
import ApiError from "../utils/ApiError.js";

export const createUser = async (userData) => {
  try {
    const { username, email } = userData;
    const { result } = await pool.query(
      "INSERT INTO users (username, email) VALUES (?, ?)",
      [username, email]
    );
    if (result.affectedRows) {
      throw new ApiError(404, "User not found");
    }
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new ApiError(409, "User already exists");
    }

    throw error;
  }
};

export const getUserById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  if (rows.length === 0) {
    throw new ApiError(404, "Not Found");
  }
  return rows[0];
};

export const getAllUsers = async () => {
  const { users } = await pool.query("SELECT * FROM users");
  return users;
};
