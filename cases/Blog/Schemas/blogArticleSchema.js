import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	author: {
		type: mongoose.Types.ObjectId,
		ref: "User",
		required: true
	},
	comments: [
		{
			type: mongoose.Types.ObjectId,
			ref: "Comments",
		}
	],
	commentsAmount: {
		type: Number,
		default: 0
	},
	likes: [
		{
			type: mongoose.Types.ObjectId,
			ref: "Likes"
		}
	],
	likesAmount: {
		type: Number,
		default: 0
	}
}, { timestamps: true })

export default mongoose.model("Articles", articleSchema)