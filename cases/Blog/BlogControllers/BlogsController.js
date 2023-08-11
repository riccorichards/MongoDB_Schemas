import articleSchema from "../Schemas/blogArticleSchema.js";
import UserSchema from "../Schemas/blogUserSchema.js";
import articleComments from "../Schemas/articleComments.js";
import articleLikes from "../Schemas/articleLikes.js";

export const createArticle = async (req, res) => {
	try {
		const doc = new articleSchema({
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
		const doc = new articleComments({
			content: req.body.content,
			author: req.userId,
			article: article
		})

		const comment = await doc.save()

		await articleSchema.findByIdAndUpdate(article,
			{
				$push: { comments: comment._id },
				$inc: { commentsAmount: 1 }
			}, { new: true })

		res.json(comment)
	} catch (e) {
		console.log(e)
		res.status(500).json({ message: "Something wents wrong" })
	}
}

export const addLikes = async (req, res) => {
	try {
		const articleId = req.params.id
		const doc = new articleLikes({
			article: articleId,
			author: req.userId
		})

		const liked = await doc.save()

		await articleSchema.findByIdAndUpdate(articleId,
			{
				$push: { likes: liked._id },
				$inc: { likesAmount: 1 }
			},
			{ new: true }
		)

		res.json(liked)
	} catch (e) {
		console.log(e)
		res.status(500)
	}
}