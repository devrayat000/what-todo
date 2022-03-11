import { useMemo } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText, { ListItemTextProps } from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import format from 'date-fns/format'

import { ITodo } from '../interfaces'
// import { useTodoStore } from '../utils/store'
import { FORMATTER } from '../utils/const'
import useTodo from '../hooks/useTodo'
import { Todo } from '../graphql/generated'

export interface TodoItemProps {
  todo: Todo
  // onDone(id: string): void
  // onDelete(id: string): void
}

export interface TodoListItemTextProps extends ListItemTextProps {
  done: boolean
}

export const TodoListItemText = styled(ListItemText, {
  shouldForwardProp: props => props !== 'done',
})<TodoListItemTextProps>(({ done }) => ({
  textDecoration: done ? 'line-through' : 'initial',
}))

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { todo: finalTodo, isLoading, done } = useTodo(todo)

  const label = useMemo(() => `todo-checkbox-${todo._id}`, [todo._id])

  return (
    <ListItem
      role='listitem'
      disabled={isLoading}
      secondaryAction={
        <IconButton
          edge='end'
          aria-label='deletes'
          onClick={_e => {
            // onDelete(fetchedTodo?._id)
          }}
        >
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton role={undefined} dense disableRipple>
        <ListItemIcon>
          <Checkbox
            edge='start'
            checked={finalTodo.done}
            tabIndex={-1}
            disableRipple
            onClick={_e => {
              console.log('checked')

              done()
              // mutate(fetchedTodo ?? todo)
            }}
            inputProps={{
              'aria-labelledby': label,
              role: 'checkbox',
            }}
          />
        </ListItemIcon>
        <TodoListItemText
          id={label}
          primary={finalTodo.note}
          primaryTypographyProps={{
            role: 'contentinfo',
          }}
          secondary={format(
            new Date(finalTodo.createdAt.toString()),
            FORMATTER
          )}
          secondaryTypographyProps={{
            role: 'timer',
          }}
          done={finalTodo.done}
        />
      </ListItemButton>
    </ListItem>
  )
}

export default TodoItem
