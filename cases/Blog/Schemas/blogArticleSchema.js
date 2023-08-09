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
	}
}, { timestamps: true })

export default mongoose.model("Articles", articleSchema)