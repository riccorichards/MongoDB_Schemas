import mongoose from "mongoose";

const E_Products = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		price: {
			type: Number,
			required: true
		}
	},
	{ timestamps: true }
)

export default mongoose.model("Products", E_Products)

//Create a schema for an e-commerce store. You have products with names, descriptions, prices, and reviews from customers. Customers can have accounts with their names, email addresses, and order history.
