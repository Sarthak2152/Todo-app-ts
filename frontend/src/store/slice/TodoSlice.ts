import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../../types";
import type { PayloadAction } from "@reduxjs/toolkit";
type TodoSliceState = {
  todos: Todo[];
};

const initialState: TodoSliceState = { todos: [] };

const TodoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.filter((todo) => {
        return todo.title !== action.payload.title;
      });
    },
    markAsDone: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.map((todo) => {
        if (todo.title === action.payload.title) {
          todo.done = !todo.done;
        }
        return todo;
      });
    },
  },
});

export const { addTodo, removeTodo, markAsDone } = TodoSlice.actions;
export default TodoSlice.reducer;
