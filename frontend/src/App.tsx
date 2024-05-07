import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import store from "./store";
import { Provider } from "react-redux";
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <h1 className="text-center text-4xl font-semibold">Todo App Using TS</h1>
      <Todos />
      <div className="mx-auto max-w-xl text-center">
        <AddTodo />
      </div>
    </Provider>
  );
};

export default App;
