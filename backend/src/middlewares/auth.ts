import { Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { UserPayload } from "../utils/types";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    const token = (<string>authorization)?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Token missing", success: false });
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET as string);
      req.user = <UserPayload>decode;
    } catch (error) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while authenticating",
    });
  }
};
