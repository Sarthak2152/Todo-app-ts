import { Todo } from "../types";
import { markAsDone } from "../store/slice/TodoSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";

type Props = {
  todo: Todo;
};
const TodoItem = ({ todo }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <li className=" flex cursor-pointer justify-between rounded border border-slate-600 p-4 shadow shadow-gray-500 hover:shadow-md hover:shadow-gray-500 ">
      <div className="">
        <h1>{todo.title}</h1>
        <h3>{todo.deadline}</h3>
      </div>
      <div className="flex flex-col items-center gap-3">
        {todo.done ? (
          <span className="text-green-500">Done</span>
        ) : (
          <span className="text-orange-500">Pending</span>
        )}
        {!todo.done && (
          <button
            onClick={() => {
              dispatch(markAsDone(todo));
            }}
            className="btn btn-success btn-xs"
          >
            Mark as Done
          </button>
        )}
        {todo.done && (
          <button
            onClick={() => {
              dispatch(markAsDone(todo));
            }}
            className="btn btn-warning btn-xs"
          >
            Mark as Un Done
          </button>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
