import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body
  const hashedPassword = bcryptjs.hashSync(password, 10)
  const newUser = new User({ username, email, password: hashedPassword })
  try {
    const validUser = await newUser.save()
    setToken(validUser, res)
    // res.status(201).json("User created successfully")
  } catch (error) {
    next(error)
    // res.status(500).json(error.message)
  }
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const validUser = await User.findOne({ email })
    if (!validUser) {
      return next(errorHandler(404, "User not found"))
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials"))
    }

    setToken(validUser, res)
  } catch (error) {
    next(error)
  }
}

export const google = async (req, res, next) => {
  try {
    const validUser = await User.findOne({ email: req.body.email })
    if (validUser) {
      setToken(validUser, res)
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8)
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      })
      const validUser = await newUser.save()
      setToken(validUser, res)
    }
  } catch (error) {
    next(error)
  }
}

export const setToken = (validUser, res) => {
  const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
  const { password: _password, ...rest } = validUser._doc
  res
    .cookie("access_token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "Strict",
    })
    .status(200)
    .json(rest)
}
