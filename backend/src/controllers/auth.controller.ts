import { RequestHandler } from "express";
import User from "../models/User";
import { comparePassword, hashPassword } from "../utils/hashPassword";
import * as jwt from "jsonwebtoken";
import { UserPayload } from "../utils/types";
export const signUp: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(401)
        .json({ success: false, message: "All fields are required" });

    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(401)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "user created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log("Error while user sign up ", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User does not exist" });
    }

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
    const payload: UserPayload = { userId: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string);
    return res
      .cookie("token", token, {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        message: "user logged in successfully",
        data: { user, token },
      });
  } catch (error) {
    console.log("Error while logging in", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};
