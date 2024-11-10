import express from "express";
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} from "./comment.controller.js";

const commentRouter = express.Router();

import { authenticateToken } from "../../Middlewares/Authentication.js";

commentRouter.post("/posts/:id/comments", authenticateToken, createComment);
commentRouter.get("/posts/:id/comments", getComments);
commentRouter.put("/comments/:id", authenticateToken, updateComment);
commentRouter.delete("/comments/:id", authenticateToken, deleteComment);

export default commentRouter;
