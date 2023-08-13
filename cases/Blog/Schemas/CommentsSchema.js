import mongoose from "mongoose";

const commentsOfArticle = new mongoose.Schema({
	content: String,

	article: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Articles"
	},

	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
}, { timestamps: true })

export default mongoose.model("Comments", commentsOfArticle)