import mongoose from "mongoose";

const LikesSchema = new mongoose.Schema({
	article: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Articles",
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	}
}, { timestamps: true })

export default mongoose.model("Likes", LikesSchema)