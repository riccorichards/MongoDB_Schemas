import { body, param } from "express-validator"

export const updateArticleValidation = [
	body("title", "You missed title field").optional().isLength({ min: 1 }),
	body("content", "You missed content field").optional().isLength({ min: 1 }),
]


export const updateCommentValidation = [
	body("content", "You missed content field").optional().isLength({ min: 1 }),
	param("id", "Invalid ID format").optional().isLength({ min: 1 })
]

export const updateUserValidation = [
	body("firstName", "FirstName's field must consist into 3 characters").optional().isLength({ min: 3 }),
	body("lastName", "LastName's field must consist into 3 characters").optional().isLength({ min: 3 }),
	body("email", "Invalid email format").optional().isEmail(),
	body("passwordHash", "Password must consist with 8 characters").optional().isLength({ min: 8 })
]	
