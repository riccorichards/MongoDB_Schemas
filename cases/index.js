import express from "express";
import mongoose from "mongoose";
import { createUser } from "./Blog/register/controller.js";
import { registerValidation } from "./Blog/register/registerValidation.js";
import { registerErrorhandler } from "./Blog/register/registerErrorhandler.js";
const URL = "mongodb://127.0.0.1:27017/BlogSchema"

mongoose.connect(URL)
	.then(() => console.log("Success connection"))
	.catch(err => console.log("Error Connection", err))
const PORT = process.env.PORT || 3000;

const app = express()
app.use(express.json())
app.post("/register", registerValidation, registerErrorhandler, createUser)

app.listen(PORT, (err) => {
	err ? console.log("Something wents wrong...!", err) : console.log(`We are running at ${PORT}`)
})
