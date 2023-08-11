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
	]
}, { timestamps: true })

export default mongoose.model("User", UserSchema)

//You're building a blog platform. Users can write articles, comment on articles, and like them. Each article has a title, content, author, and publication date.