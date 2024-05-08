import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth";
import {
  getAllTodos,
  createTodo,
  getTodoById,
} from "../controllers/todos.controller";
const router = Router();

router.get("/", isLoggedIn, getAllTodos);
router.get("/:id", isLoggedIn, getTodoById);
router.post("/", isLoggedIn, createTodo);
router.patch("/:id");
router.delete("/:id");

export default router;
