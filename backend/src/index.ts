import express from "express";
import "dotenv/config";
import todoRouter from "./routes/todos.router";
import authRouter from "./routes/auth.router";
import { connectDB } from "./config/db";
const app = express();

// connections
connectDB();

// middle wares
app.use(express.json());

// Setting up routers
app.use("/todos", todoRouter);
app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running 🚀 on port ${process.env.PORT}`);
});
