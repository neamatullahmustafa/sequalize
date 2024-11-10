import express from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from "./post.controller.js";
import { authenticateToken } from "../../Middlewares/Authentication.js";

const postRouter = express.Router();

postRouter.post("/posts", authenticateToken, createPost);
postRouter.get("/posts", getPosts);
postRouter.get("/posts/:id", getPost);
postRouter.put("/posts/:id", authenticateToken, updatePost);
postRouter.delete("/posts/:id", authenticateToken, deletePost);

export default postRouter;
