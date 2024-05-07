export type Todo = {
  description: string;
  done: boolean;
  title: string;
  deadline: string;
};

export type TodoAction = (todo: Todo) => void;
