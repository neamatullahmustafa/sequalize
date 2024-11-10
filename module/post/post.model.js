import { Sequelize } from "sequelize";
import sequelize from "../../config/db.connection.js";

export const Post = sequelize.define("Post", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  author: Sequelize.INTEGER,
  title: Sequelize.STRING,
  content: Sequelize.STRING,
});
