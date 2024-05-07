import { useForm, SubmitHandler } from "react-hook-form";
import { Todo } from "../types";
import { addTodo } from "../store/slice/TodoSlice";
import { useDispatch } from "react-redux";
type TodoInput = {
  title: string;
  description: string;
  deadline: string;
};

const AddTodo = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoInput>();

  function handleOpenModal() {
    const modal = document.getElementById("addTodoModal") as HTMLDialogElement;
    modal.showModal();
  }
  function handleCloseModal() {
    const modal = document.getElementById("addTodoModal") as HTMLDialogElement;
    modal.close();
  }
  const onSubmit: SubmitHandler<TodoInput> = (data) => {
    console.log(data);
    const newTodo: Todo = {
      title: data.title,
      description: data.description,
      done: false,
      deadline: data.deadline,
    };
    dispatch(addTodo(newTodo));
    reset();
    handleCloseModal();
  };
  return (
    <>
      <button className="btn btn-primary" onClick={handleOpenModal}>
        Add todo
      </button>
      <dialog id="addTodoModal" className="modal">
        <div className="modal-box w-11/12 max-w-xl">
          <h3 className="mb-12 text-2xl font-semibold">Add todo</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-8">
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  {...register("title", { required: "Title is required" })}
                  className="input input-bordered w-full max-w-lg"
                />
                {errors && errors.title && (
                  <p className="px-4 text-left text-sm text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="input input-bordered w-full max-w-lg"
                />
                {errors && errors.description && (
                  <p className="px-4 text-left text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="date"
                  placeholder="Description"
                  {...register("deadline", {
                    required: "Deadline is required",
                  })}
                  className="input input-bordered w-full max-w-lg"
                />
                {errors && errors.deadline && (
                  <p className="px-4 text-left text-sm text-red-500">
                    {errors.deadline.message}
                  </p>
                )}
              </div>
            </div>
            <div className="modal-action">
              <button className="btn btn-primary">Add</button>
              <button onClick={handleCloseModal} type="reset" className="btn">
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddTodo;
