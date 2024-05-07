import { RequestHandler } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/hashPassword";
import * as jwt from "jsonwebtoken";
export const signUp: RequestHandler = async (req, res) => {
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
  const newUser = await User.create({ name, email, password: hashedPassword });

  const payload = { userId: newUser._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
  return res.status(200).json({ success: true, user: newUser, token: token });
};
