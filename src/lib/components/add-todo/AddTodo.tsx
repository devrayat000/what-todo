import { useRef, useCallback } from "react";

import { useStoreActions } from "$lib/store";

export interface MyAddTodoProps {
  createTodo(text: string, done?: boolean): void | Promise<void>;
}

export const MyAddTodo: React.FC<MyAddTodoProps> = ({ createTodo }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLInputElement>(null);
  const render = useRef(0);
  console.log("add todo rendered:", ++render.current);

  const handleCreateTodo = useCallback<React.FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();
      if (inputRef.current?.value) {
        await createTodo(inputRef.current.value, !!doneRef.current?.checked);
        inputRef.current.value = "";
      }
    },
    []
  );

  return (
    <form
      onSubmit={handleCreateTodo}
      className="prose-p:text-light-very-dark-grayish-blue rounded-md bg-white dark:bg-dark-desaturated-blue py-2 px-4 shadow-md flex items-center gap-3"
    >
      <input type="checkbox" name="done" id="done" ref={doneRef} />
      <input
        type="text"
        name="todo"
        id="todo"
        className="flex-1 focus:outline-none bg-inherit dark:text-light-very-grayish-blue caret-primary"
        placeholder="Create a new todo..."
        ref={inputRef}
      />
    </form>
  );
};

const AddTodo: React.FC = () => {
  const addTodo = useStoreActions((store) => store.todo.createTodo);

  return (
    <MyAddTodo
      createTodo={(text, done) =>
        addTodo({
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, et?",
          text,
          done,
        })
      }
    />
  );
};

export default AddTodo;
