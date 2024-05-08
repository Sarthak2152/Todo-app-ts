import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";

const App: React.FC = () => {
  return (
    <>
      <h1 className="text-center text-4xl font-semibold">Todo App Using TS</h1>
      <Todos />
      <div className="mx-auto max-w-xl text-center">
        <AddTodo />
      </div>
    </>
  );
};

export default App;
