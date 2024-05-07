import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { RootState } from "../store";

const Todos: React.FC = () => {
  const { todos } = useSelector((state: RootState) => state.todo);

  return (
    <div className="mx-auto my-8 max-w-xl rounded border p-6">
      <h1 className="text-center text-2xl">All Todos</h1>
      {todos.length === 0 && (
        <div className="grid h-36 place-content-center">
          <h2 className="text-center text-xl text-green-500">
            Add todos to get started !
          </h2>
        </div>
      )}
      <ul className="mt-4 flex flex-col gap-4">
        {todos.map((todo) => {
          return <TodoItem key={todo.title} todo={todo} />;
        })}
      </ul>
    </div>
  );
};

export default Todos;
