import express from "express";
import { config } from "dotenv";
import todoRouter from "./routes/todos.router";
import authRouter from "./routes/auth.router";
import { connectDB } from "./config/db";
import cookieParser from "cookie-parser";
const app = express();
config();

// connections
connectDB();

// middle wares
app.use(express.json());
app.use(cookieParser());

// Setting up routers
app.use("/todos", todoRouter);
app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running 🚀 on port ${process.env.PORT}`);
});
