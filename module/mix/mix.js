import express from "express";
import { User } from "../user/user.model.js";
import { Post } from "../post/post.model.js";
import { Comment } from "../comment/comment.model.js";
const getUserWithPostAndComments = async (req, res) => {
  const userId = req.params.userId;
  const postId = req.params.postId;

  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Post,
          where: { id: postId },
          include: [Comment],
        },
      ],
    });

    if (!user)
      return res.status(404).json({ message: "User or post not found" });

    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user, post, and comments", error });
  }
};
const mixRouter = express.Router();
mixRouter.get(
  "/getUserWithPostAndComments/:uid/:pid",
  getUserWithPostAndComments
);

export default mixRouter;
