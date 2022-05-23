import { useStoreActions, useTodoStore } from "$lib/store";
import { useEffect } from "react";
import TodoList from "./TodoList";

const Todos = () => {
  const todos = useTodoStore((store) => store.todo.filteredItems);
  const todosX = useTodoStore((store) => store.todo.items);
  const remaining = useTodoStore((store) => store.todo.remaining);
  const clearCompleted = useStoreActions(
    (action) => action.todo.deleteCompleted
  );
  const reorder = useStoreActions((action) => action.todo.reorderTodos);

  useEffect(() => {
    console.log(todosX);
  }, [todosX]);

  return (
    <TodoList
      todos={todos}
      remaining={remaining.length}
      clearCompleted={clearCompleted}
      reorder={reorder}
    />
  );
};

export default Todos;
