// import List from "@mui/material/List";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import Collapse from "@mui/material/Collapse";
// import { TransitionGroup } from "react-transition-group";
// import { Button, Divider, ListItem, Typography } from "@mui/material";

import FilterTodos from "../filter";
import TodoItem, { ListItem } from "../todo-item/TodoItem";
import type Todo from "$lib/utils/todo";
import { Reorder } from "framer-motion";

export interface TodoListProps {
  todos: Todo[];
  remaining: number;
  clearCompleted(): void | Promise<void>;
  reorder(todos: Todo[]): void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  remaining,
  clearCompleted,
  reorder,
}) => {
  return (
    <div className="prose-p:text-light-very-dark-grayish-blue dark:prose-p:text-dark-light-grayish-blue relative z-10 mt-3 rounded-md overflow-hidden shadow-lg divide-y dark:divide-dark-grayish-blue">
      <Reorder.Group
        axis="y"
        as="div"
        className="divide-y dark:divide-dark-grayish-blue"
        values={todos}
        onReorder={reorder}
      >
        {todos.map((todo) => {
          return <TodoItem key={todo._id} todo={todo} />;
        })}
      </Reorder.Group>
      <ListItem className="py-4 text-light-dark-grayish-blue dark:text-dark-grayish-blue prose-p:text-light-dark-grayish-blue dark:prose-p:text-dark-grayish-blue text-xs">
        <p className="my-0">{remaining} items left</p>
        <FilterTodos className="hidden md:flex shadow-none mt-0 p-0" />

        <button type="reset" onClick={clearCompleted}>
          Clear Completed
        </button>
      </ListItem>
    </div>
  );
};

export default TodoList;

// const UlPaper = withProps(Paper, { elevation: 20, component: "ul" });
