import { Post } from "./post.model.js";
import { User } from "../user/user.model.js";

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.userId;

  try {
    const post = await Post.create({ title, content, author: userId });
    res.status(201).json({ message: "Post created", post });
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

const getPost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findByPk(postId, {
      include: [{ model: User, as: "author" }],
    });
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  const userId = req.userId;

  try {
    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author !== userId) {
      return res
        .status(403)
        .json({ message: "You can only edit your own posts" });
    }

    post.title = title;
    post.content = content;
    await post.save();

    res.status(200).json({ message: "Post updated", post });
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error });
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.userId;

  try {
    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author !== userId) {
      return res
        .status(403)
        .json({ message: "You can only delete your own posts" });
    }

    post.deletedAt = new Date();
    await post.save();

    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
};

export { createPost, getPosts, getPost, updatePost, deletePost };
