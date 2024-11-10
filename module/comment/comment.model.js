import { Sequelize } from "sequelize";
import sequelize from "../../config/db.connection.js";

export const Comment = sequelize.define("Comment", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: Sequelize.STRING,
  userId: Sequelize.INTEGER,
  postId: Sequelize.INTEGER,
});
