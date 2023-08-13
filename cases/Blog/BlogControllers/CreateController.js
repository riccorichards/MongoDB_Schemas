import ArticleSchema from "../Schemas/ArticleSchema.js";
import UserSchema from "../Schemas/UserSchema.js";
import CommentsSchema from "../Schemas/CommentsSchema.js";
import LikesSchema from "../Schemas/LikesSchema.js";

export const createArticle = async (req, res) => {
	try {
		const doc = new ArticleSchema({
			title: req.body.title,
			content: req.body.content,
			author: req.userId
		})


		const article = await doc.save()

		await UserSchema.findByIdAndUpdate(req.userId, {
			$push: { articles: article._id }
		})

		res.json(article)
	} catch (err) {
		console.log(err)
		return res.status(404).json({ message: "Something wents wrong..." })
	}
}

export const createComment = async (req, res) => {
	try {
		const article = req.params.id
		const doc = new CommentsSchema({
			content: req.body.content,
			author: req.userId,
			article: article
		})

		const comment = await doc.save()

		await ArticleSchema.findByIdAndUpdate(article,
			{
				$push: { comments: comment._id },
				$inc: { commentsAmount: 1 }
			}, { new: true })

		await UserSchema.findByIdAndUpdate(req.userId, {
			$push: { comments: comment.id }
		})

		res.json(comment)
	} catch (e) {
		console.log(e)
		res.status(500).json({ message: "Something wents wrong" })
	}
}

export const addLikes = async (req, res) => {
	try {
		const articleId = req.params.id
		const doc = new LikesSchema({
			article: articleId,
			author: req.userId
		})

		const liked = await doc.save()

		await ArticleSchema.findByIdAndUpdate(articleId,
			{
				$push: { likes: liked._id },
				$inc: { likesAmount: 1 }
			},
			{ new: true }
		)

		 
		await UserSchema.findByIdAndUpdate(req.userId, {
			$push: { Likes: liked.id }
		})
		res.json(liked)
	} catch (e) {
		console.log(e)
		res.status(500)
	}
}

