import express from "express";
import mongoose from "mongoose";

const URL = "mongodb://127.0.0.1:27017/BlogSchema"

mongoose.connect(URL)
	.then(() => console.log("Success connection"))
	.catch(err => console.log("Error Connection", err))
const PORT = process.env.PORT || 3000;

const app = express()

app.listen(PORT, (err) => {
	err ? console.log("Something wents wrong...!", err) : console.log(`We are running at ${PORT}`)
})
