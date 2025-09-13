import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import postRoutes from "./src/routes/post.routes.js";
import commentRoutes from "./src/routes/comment.routes.js";
import config from "./src/config/index.js";

dotenv.config();

const app = express();
const port = config.port;

app.use(express.json());

if (config.nodeEnv === "development") {
  app.use(morgan("dev"));
} else {
  null;
}

app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.listen(port, () => {
  console.log(
    `Server is running in ${config.nodeEnv} on http://localhost:${port}`
  );
});
