import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import postRoutes from "./src/routes/post.routes.js";
import commentRoutes from "./src/routes/comment.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import { testConnection } from "./src/config/db.js";
import { errorHandler } from "./src/middlewares/errorHandler.middleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  null;
}

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} on http://localhost:${port}`
  );
  testConnection();
});
