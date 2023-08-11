import mongoose from "mongoose";

const E_Customers = new mongoose.Schema(
	{
		userName: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			index: true
		},
		hashPassword: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
)

export default mongoose.model("Customers", E_Customers)


//Create a schema for an e-commerce store. You have products with names, descriptions, prices, and reviews from customers. Customers can have accounts with their names, email addresses, and order history.
