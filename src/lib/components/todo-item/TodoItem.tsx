// import { useMemo } from "react";
import {
  m,
  Reorder,
  useMotionValue,
  type HTMLMotionProps,
} from "framer-motion";

import { useStoreActions } from "$lib/store";
import type Todo from "$lib/utils/todo";
import clsx from "clsx";
import { useRaisedShadow } from "$lib/hooks/use-raised-shadow";

export interface MyTodoItemProps {
  todo: Todo;
  toggleDone(id: string): void | Promise<void>;
  deleteTodo(id: string): void | Promise<void>;
}

export interface TodoItemProps {
  todo: Todo;
}

const cls =
  "bg-white dark:bg-dark-desaturated-blue flex justify-between items-center py-3 px-4 gap-3";

export const ListItem = ({
  className,
  ...props
}: HTMLMotionProps<"article">) => (
  <m.article role="listitem" className={clsx(cls, className)} {...props} />
);

export const MyTodoItem: React.FC<MyTodoItemProps> = (props) => {
  const { todo, toggleDone, deleteTodo } = props;

  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  // const label = useMemo(() => `todo-checkbox-${todo._id}`, [todo._id]);

  return (
    <Reorder.Item
      value={todo}
      id={todo._id}
      as="article"
      className={cls}
      style={{ boxShadow, y }}
    >
      {/* <ListItem> */}
      <input
        type="checkbox"
        name="done"
        id="done"
        checked={todo.done}
        onChange={() => toggleDone(todo._id)}
      />
      <p className="flex-1 my-0 truncate text-xs" role="contentinfo">
        {todo.todo}
      </p>
      <button
        type="button"
        onClick={() => deleteTodo(todo._id)}
        className="grid place-items-center p-1.5 rounded-[50%] w-6 h-6 transition-colors focus-visible:outline-none hover:bg-slate-100 active:bg-slate-200"
      >
        <img src="/images/icon-cross.svg" alt="Delete Todo" className="m-0" />
      </button>
      {/* </ListItem> */}
    </Reorder.Item>
    // <ListItem
    //   role='listitem'
    //   disabled={false}
    //   sx={{
    //     px: t => t.spacing(3.5),
    //     py: t => t.spacing(0.75),
    //     fontSize: '1rem',
    //   }}
    //   disablePadding
    //   button
    //   onClick={async _e => {
    //     console.log('checked', todo._id)

    //     await toggleDone(todo._id)
    //     // mutate(fetchedTodo ?? todo)
    //   }}
    //   divider={divider}
    // >
    //   <ListItemIcon>
    //     <TodoCheckbox
    //       edge='start'
    //       checked={todo.done}
    //       tabIndex={-1}
    //       disableRipple
    //       inputProps={{
    //         'aria-labelledby': label,
    //         role: 'checkbox',
    //       }}
    //     />
    //   </ListItemIcon>
    //   <ListItemText
    //     id={label}
    //     primary={todo.todo}
    //     primaryTypographyProps={{
    //       role: 'contentinfo',
    //       variant: 'h5',
    //       component: 'h5',
    //     }}
    //     sx={{ textDecoration: todo.done ? 'line-through' : 'initial' }}
    //   />
    //   <IconButton
    //     edge='end'
    //     aria-label='deletes'
    //     sx={{ fontSize: 'inherit' }}
    //     onClickCapture={async _e => {
    //       console.log('deleted')

    //       await deleteTodo(todo._id)
    //     }}
    //   >
    //     <DeleteIcon />
    //   </IconButton>
    // </ListItem>
  );
};

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const toggleDone = useStoreActions((store) => store.todo.completeTodo);
  const deleteTodo = useStoreActions((store) => store.todo.deleteTodo);

  return (
    <MyTodoItem
      toggleDone={(id) => toggleDone(id)}
      deleteTodo={(id) => deleteTodo(id)}
      {...props}
    />
  );
};

export default TodoItem;
