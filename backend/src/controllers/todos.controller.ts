import { NextFunction, Request, RequestHandler, Response } from "express";
import Todo from "../models/Todo";

// or instead of doing all this we can also do
export async function getAllTodos(req: Request, res: Response) {
  try {
    const { userId } = req.body;
    const todos = await Todo.find({ createdBy: userId });
    if (todos.length > 0) {
    }
  } catch (error) {
    res.status(500).json({ success: false });
  }
}

// we can also do
export const getTodo: RequestHandler = (req, res, next) => {};
