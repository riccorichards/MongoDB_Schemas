import { body } from "express-validator";

export const registerValidation = [
	body("firstName", "FirstName's field must consist into 3 characters").isLength({ min: 3 }),
	body("lastName", "LastName's field must consist into 3 characters").isLength({ min: 3 }),
	body("email", "Invalid email format").isEmail(),
	body("passwordHash", "Password must consist with 8 characters").isLength({ min: 8 })
]

export const loginValidation = [
	body("email", "Invalid email format").isEmail(),
	body("passwordHash", "Password must consist with 8 characters").isLength({ min: 8 })
]

