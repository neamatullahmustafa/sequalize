import { User } from "../user/user.model.js";
import { Post } from "../post/post.model.js";
import { Comment } from "../comment/comment.model.js";

User.hasMany(Post, {
  foreignKey: "author",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Post.belongsTo(User, { foreignKey: "author" });
Post.hasMany(Comment, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Comment.belongsTo(User, { foreignKey: "userId" });

Comment.belongsTo(Post, { foreignKey: "postId" });
