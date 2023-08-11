import mongoose from "mongoose";

const productsReviews = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true
		},

		rated: {
			type: Number,
			required: true,
			min: 1,
			max: 5
		},

		customer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Customers",
			required: true
		},

		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Products",
			required: true
		},

	}, { timestamps: true }
)

export default mongoose.model("Reviews", productsReviews)