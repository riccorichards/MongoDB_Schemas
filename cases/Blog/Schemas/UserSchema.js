import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		index: true
	},
	passwordHash: {
		type: String,
		required: true,
	},
	articles: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Article"
		}
	],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comments"
		}
	],
	Likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Likes"
		}
	],
}, { timestamps: true })

export default mongoose.model("User", UserSchema)
