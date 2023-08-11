import mongoose from "mongoose";

const orderHistory = new mongoose.Schema(
	{
		customer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Customers",
			required: true
		},
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Products",
					required: true
				},
				quantity: {
					type: Number,
					required: true
				}
			}
		],
		totalPrice: {
			type: Number,
			required: true
		},
		status: {
			type: String,
			default: "pending"
		}
	},
	{ timestamps: true }
)

export default mongoose.model("Orders", orderHistory)