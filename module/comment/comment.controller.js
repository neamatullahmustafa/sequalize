import { Comment } from "./comment.model.js";
import { Post } from "../post/post.model.js";
import { User } from "../user/user.model.js";

const createComment = async (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;
  const userId = req.userId;

  try {
    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = await Comment.create({ content, userId, postId });
    res.status(201).json({ message: "Comment created", comment });
  } catch (error) {
    res.status(500).json({ message: "Error creating comment", error });
  }
};

const getComments = async (req, res) => {
  const postId = req.params.id;

  try {
    const comments = await Comment.findAll({ where: { postId } });
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

const updateComment = async (req, res) => {
  const commentId = req.params.id;
  const { content } = req.body;
  const userId = req.userId;

  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You can only edit your own comments" });
    }

    comment.content = content;
    await comment.save();

    res.status(200).json({ message: "Comment updated", comment });
  } catch (error) {
    res.status(500).json({ message: "Error updating comment", error });
  }
};

const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  const userId = req.userId;

  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You can only delete your own comments" });
    }

    await comment.destroy();

    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
};

export { createComment, getComments, updateComment, deleteComment };
