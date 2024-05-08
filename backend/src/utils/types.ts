import * as mongoose from "mongoose";

export type User = {
  name: string;
  email: string;
  password: string;
};

export type UserPayload = {
  userId: mongoose.Types.ObjectId;
  email: string;
};
