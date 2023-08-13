import express from "express";
import mongoose from "mongoose";
import { createUser, getMe, loginUser } from "./Blog/BlogControllers/Authcontroller.js";
import { registerValidation, loginValidation } from "./Blog/BlogValidation/AuthValidation.js";
import { Errorhandler } from "./Blog/BlogValidation/Errorhandler.js";
import checkerMiddleware from "./Blog/BlogValidation/checkerMiddleware.js";
import { articleValidation, commentValidation } from "./Blog/BlogValidation/createValidation.js";
import { addLikes, createArticle, createComment } from "./Blog/BlogControllers/CreateController.js";
import { deleteArticles, deleteComment, deleteLike } from "./Blog/BlogControllers/RemoveController.js";
import { articleUpdate, commentUpdate, userUpdate } from "./Blog/BlogControllers/UpdateController.js";
import { updateUserValidation, updateCommentValidation, updateArticleValidation } from "./Blog/BlogValidation/updateValidation.js";
const BLOG_URL = "mongodb://127.0.0.1:27017/BlogSchema"
const ECOMMERCE_URL = "mongodb://127.0.0.1:27017/Ecommerce"

const parsedUrl = new URL(BLOG_URL)
const endpoint = parsedUrl.pathname + parsedUrl.search

mongoose.connect(BLOG_URL)
	.then(() => console.log(`Success connection to ${endpoint}`))
	.catch(err => console.log("Error Connection", err))
const PORT = process.env.PORT || 3000;

const app = express()
app.use(express.json())


app.get("/blog/me", checkerMiddleware, Errorhandler, getMe)

app.post("/blog/register", registerValidation, Errorhandler, createUser)
app.post("/blog/login", loginValidation, Errorhandler, loginUser)
app.post("/blog/article", articleValidation, Errorhandler, checkerMiddleware, createArticle)
app.post("/blog/:id/comment", commentValidation, Errorhandler, checkerMiddleware, createComment)
app.post("/blog/:id/like", checkerMiddleware, addLikes)

app.delete("/blog/:id", checkerMiddleware, deleteArticles)
app.delete("/blog/:Artid/comment/:Comid", checkerMiddleware, deleteComment)
app.delete("/blog/:Artid/like/:Likid", checkerMiddleware, deleteLike)

app.put("/blog/auth", checkerMiddleware, updateUserValidation, Errorhandler, userUpdate)
app.put("/blog/article/:id", checkerMiddleware, updateArticleValidation, Errorhandler, articleUpdate)
app.put("/blog/:id/comment/:commentId", checkerMiddleware, updateCommentValidation, commentUpdate)


app.listen(PORT, (err) => {
	err ? console.log("Something wents wrong...!", err) : console.log(`We are running at ${PORT}`)
})
