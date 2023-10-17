import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js"

dotenv.config()
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.error("Error connecting to Database", e))

const app = express()

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})

app.use("/api/user", userRouter)
