import CommentsSchema from "../Schemas/CommentsSchema.js"
import LikesSchema from "../Schemas/LikesSchema.js"
import UserSchema from "../Schemas/UserSchema.js"
import ArticleSchema from "../Schemas/ArticleSchema.js"



export const deleteArticles = async (req, res) => {
	try {
		const articleId = req.params.id

		const article = await ArticleSchema.findById(articleId)

		if (!article) {
			return res.status(404).json({ message: "Article not found" });
		}

		if (article.author.toString() !== req.userId) {
			return res.status(403).json({ message: "You are not authorized to delete this article" })
		}

		const user = await UserSchema.findOne({ _id: req.userId },)

		if (!user) {
			return res.status(500).json({ message: "Something wents wrong..." })
		}

		user.articles = user.articles.filter(el => el.toString() !== articleId)
		await user.save()

		await ArticleSchema.findByIdAndRemove(articleId)

		res.status(200).json({ message: "Article deleted successfully" });

	} catch (e) {
		console.log(e)
		res.status(500)
	}
}

export const deleteComment = async (req, res) => {
	const commentId = req.params.Comid;
	const articleId = req.params.Artid;

	try {
		const commnet = await CommentsSchema.findById(commentId)
		const article = await ArticleSchema.findById(articleId)

		if (commnet.author.toString() !== req.userId) {
			return res.status(403).json({ message: "You are not authorized to delete this comment" })
		}

		const user = await UserSchema.findOne({ _id: req.userId })

		await ArticleSchema.updateOne(article,
			{
				$pull: { comments: commentId },
				$inc: { commentsAmount: -1 }
			}, { new: true })

		user.comments = user.comments.filter(el => el.toString() !== commentId)
		await user.save()

		await CommentsSchema.findByIdAndRemove(commentId)

		res.status(200).json({ message: "The comment succsefully removed" })
	} catch (e) {
		console.log(e)
		res.status(500)
	}
}

export const deleteLike = async (req, res) => {
	const likeId = req.params.Likid;
	const articleId = req.params.Artid;

	try {
		const user = await UserSchema.findById(req.userId)
		const exsitLIke = user.Likes.find(like => like.toString() === likeId)

		if (!exsitLIke) {
			return res.json({ message: "Before you unliked this post you have to like it" })
		}
    const article = ArticleSchema.findById(articleId)
		await ArticleSchema.updateOne(article,
			{
				$pull: { likes: likeId },
				$inc: { likesAmount: -1 }
			}, { new: true })

		user.Likes = user.Likes.filter(like => like.toString() !== likeId)
		await user.save()

		await LikesSchema.findByIdAndDelete(likeId)
		res.status(200).json({ message: "The like was successfully removed" })
	} catch (e) {
		console.log(e)
		res.status(500)
	}
}