import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
	password: {
		type: String,
		required: true,
	}
}, { timestamps: true })

export default mongoose.model("User", userSchema)

//You're building a blog platform. Users can write articles, comment on articles, and like them. Each article has a title, content, author, and publication date.