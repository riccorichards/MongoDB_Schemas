import { body, param } from "express-validator";

export const articleValidation = [
	body("title", "You missed title field").isLength({ min: 1 }),
	body("content", "You missed content field").isLength({ min: 1 }),
]


export const commentValidation = [
	body("content", "You missed content field").isLength({ min: 1 }),
	param("id", "Invalid ID format").isLength({ min: 1 })
]
