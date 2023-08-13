import jwt from "jsonwebtoken";

export default (req, res, next) => {
	const token = (req.headers.authorization || "").replace(/Bearer\s?/, "")

	if (!token) {
		return res.status(401).json({ message: "Authentication token not provided" })
	}

	try {
		const decoded = jwt.verify(token, "secret123")
		req.userId = decoded.id
		next()

	} catch (e) {
		if (e.name === "TokenExpiredError") {
			return res.status(403).json({ message: "Token has expired. Please log in again." });
		}
		return res.status(403).json({ message: "Token is invalid. Please authenticate again." });
	}
}