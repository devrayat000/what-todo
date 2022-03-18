import { useEffect, useMemo } from 'react'
import ListItem, { ListItemProps } from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

import { Todo } from '$graphql/generated'
import { useStoreActions } from '$lib/utils/store'
import TodoCheckbox from '../checkbox'

export interface MyTodoItemProps extends Pick<ListItemProps, 'divider'> {
  todo: Todo
  toggleDone(id: string): void | Promise<void>
  deleteTodo(id: string): void | Promise<void>
}

export interface TodoItemProps extends Pick<ListItemProps, 'divider'> {
  todo: Todo
}

export const MyTodoItem: React.FC<MyTodoItemProps> = props => {
  const { todo, toggleDone, deleteTodo, divider } = props

  const label = useMemo(() => `todo-checkbox-${todo._id}`, [todo._id])

  return (
    <ListItem
      role='listitem'
      disabled={false}
      sx={{
        px: t => t.spacing(3.5),
        py: t => t.spacing(0.75),
        fontSize: '1rem',
      }}
      disablePadding
      button
      onClick={async _e => {
        console.log('checked', todo._id)

        await toggleDone(todo._id)
        // mutate(fetchedTodo ?? todo)
      }}
      divider={divider}
    >
      <ListItemIcon>
        <TodoCheckbox
          edge='start'
          checked={todo.done}
          tabIndex={-1}
          disableRipple
          inputProps={{
            'aria-labelledby': label,
            role: 'checkbox',
          }}
        />
      </ListItemIcon>
      <ListItemText
        id={label}
        primary={todo.todo}
        primaryTypographyProps={{
          role: 'contentinfo',
          variant: 'h5',
          component: 'h5',
        }}
        sx={{ textDecoration: todo.done ? 'line-through' : 'initial' }}
      />
      <IconButton
        edge='end'
        aria-label='deletes'
        sx={{ fontSize: 'inherit' }}
        onClickCapture={async _e => {
          console.log('deleted')

          await deleteTodo(todo._id)
        }}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}

const TodoItem: React.FC<TodoItemProps> = props => {
  const toggleDone = useStoreActions(store => store.todo.completeTodo)
  const deleteTodo = useStoreActions(store => store.todo.deleteTodo)

  return (
    <MyTodoItem
      toggleDone={id => toggleDone(id)}
      deleteTodo={id => deleteTodo(id)}
      {...props}
    />
  )
}

export default TodoItem
