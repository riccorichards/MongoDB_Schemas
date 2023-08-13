import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserSchema from "../Schemas/UserSchema.js";

export const createUser = async (req, res) => {
	try {
		const password = req.body.passwordHash;
		const salt = await bcrypt.genSalt(10)
		const passHash = await bcrypt.hash(password, salt)


		const doc = new UserSchema({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			passwordHash: passHash
		})

		const user = await doc.save()

		const { passwordHash, ...userData } = user._doc

		const token = jwt.sign(
			{ id: user.id },
			"secret123",
			{ expiresIn: "5d" }
		)

		res.json({ userData, token })
	} catch (err) {
		if (err?.keyPattern.email > 0) {
			return res.status(400).json({ message: "Email is already exist" })
		}
		console.log(err)
		res.status(500).json({ message: "Something wents wrong...!" })
	}

}

export const loginUser = async (req, res) => {
	try {
		const user = await UserSchema.findOne({ email: req.body.email })
		if (!user) {
			return res.status(404).json({ message: "Incorrect password or email" })
		}

		const isPasswordValid = await bcrypt.compare(req.body.passwordHash, user.passwordHash)

		if (!isPasswordValid) {
			return res.status(404).json({ message: "Incorrect password or email" })
		}


		const token = jwt.sign(
			{ id: user.id },
			"secret123",
			{ expiresIn: "5d" }
		)

		const { passwordHash, ...userData } = user._doc

		res.status(200).json({ ...userData, token })
	} catch (e) {
		console.log(e)
		res.status(500).json({ message: "Something wents wrong..." })
	}
}

export const getMe = async (req, res) => {
	try {

		const user = await UserSchema.findById(req.userId)

		if (!user) {
			return res.status(404).json({ message: "Something wents wrong..." })
		}
		const { passwordHash, ...userData } = user._doc

		res.status(200).json({ ...userData })

	} catch (e) {
		console.log(e)
		return res.status(404).json({ message: "Something wents wrong..." })
	}
}