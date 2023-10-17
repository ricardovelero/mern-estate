import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
    },
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema)

export default User
