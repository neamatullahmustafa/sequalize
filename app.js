import express from "express";
import sequelize from "./config/db.connection.js";
import userRouter from "./module/user/user.route.js";
import postRouter from "./module/post/post.route.js";
import commentRouter from "./module/comment/comment.route.js";
import cors from "cors";
import mixRouter from "./module/mix/mix.js";
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(mixRouter);

sequelize.sync({ alert: true }).then(() => {
  console.log("Models have been synchronized with the database.");
});
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
