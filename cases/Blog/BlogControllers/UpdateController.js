import CommentsSchema from "../Schemas/CommentsSchema.js"
import LikesSchema from "../Schemas/LikesSchema.js"
import UserSchema from "../Schemas/UserSchema.js"
import ArticleSchema from "../Schemas/ArticleSchema.js"

export const userUpdate = async (req, res) => {
	const editUser = req.body;

	try {

		const updatedUser = await UserSchema.findByIdAndUpdate({ _id: req.userId }, {
			$set: editUser
		}, { new: true })

		res.json(updatedUser)
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something wents wrong..." })
	}
}

export const articleUpdate = async (req, res) => {
	const articleId = req.params.id
	const editArticle = req.body
	try {
		const usersArticle = await UserSchema.findOne({ articles: articleId })
		if (usersArticle._id.toString() !== req.userId) {
			return res.status(403).json({ message: "You have not permission to update this article!" })
		}

		const updatedArticle = await ArticleSchema.findByIdAndUpdate({ _id: articleId },
			{ $set: editArticle }, { new: true }
		)

		res.status(201).json(updatedArticle)
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something wents wrong..." })
	}
}

export const commentUpdate = async (req, res) => {
	const commentId = req.params.commentId
	const editComment = req.body;
	try {

		const user = await UserSchema.findOne({ _id: req.userId })
		const validComment = user.comments.find(comment => comment.toString() === commentId)
		
		if (commentId !== validComment.toString()) {
			return res.status(403).json({ message: "You have not permission to update this comment!" })
		}

		const comment = await CommentsSchema.findByIdAndUpdate(commentId, {
			$set: editComment
		}, { new: true })

		res.status(201).json(comment)
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Something wents wrong..." })
	}
}