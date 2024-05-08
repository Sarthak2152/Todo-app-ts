import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth";
import {
  getAllTodos,
  createTodo,
  getTodoById,
  editTodo,
  deleteTodo,
} from "../controllers/todos.controller";
const router = Router();

router.get("/", isLoggedIn, getAllTodos);
router.get("/:id", isLoggedIn, getTodoById);
router.post("/", isLoggedIn, createTodo);
router.patch("/:id", isLoggedIn, editTodo);
router.delete("/:id", isLoggedIn, deleteTodo);

export default router;
