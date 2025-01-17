import { NextFunction, Request, RequestHandler, Response } from "express";
import Todo from "../models/Todo";

// or instead of doing all this we can also do
export async function getAllTodos(req: Request, res: Response) {
  try {
    const user = req.user;
    const todos = await Todo.find({ createdBy: user?.userId });
    if (todos) {
      res.status(200).json({
        success: true,
        data: todos,
        message: "Successfully fetched todo's",
      });
    } else {
      res.status(404).json({ success: false, message: "No todo's found" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetch all todos",
    });
  }
}

// we can also do
export const getTodoById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Found todo", data: todo });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching todo by id",
    });
  }
};

// create a todo
export const createTodo: RequestHandler = async (req, res) => {
  try {
    const user = req.user;
    const { title, description, deadline } = req.body;
    const newTodo = await Todo.create({
      title,
      description,
      deadline,
      done: false,
      createdBy: user?.userId,
    });
    return res.status(200).json({
      success: true,
      data: newTodo,
      message: "Todo created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating todo",
    });
  }
};

// edit todo
export const editTodo: RequestHandler = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const { title, description, deadline, done } = req.body;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    if (!todo.createdBy?.equals(user?.userId)) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to edit this todo" });
    }
    // Update the todo
    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.deadline = deadline || todo.deadline;
    todo.done = done !== undefined ? done : todo.done;
    const updatedTodo = await todo.save();
    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating todo",
    });
  }
};

// delete todo
export const deleteTodo: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }
    return res.status(200).json({
      success: true,
      todo,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting todo",
    });
  }
};
