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

import { FORMATTER } from '../utils/const'
import { Todo, useTodoUpdatedSubscription } from '../graphql/generated'
import { useTodoStore } from '../utils/store'

export interface TodoItemProps {
  todo: Todo
}

export interface TodoListItemTextProps extends ListItemTextProps {
  done: boolean
}

export const TodoListItemText = styled(ListItemText, {
  shouldForwardProp: props => props !== 'done',
})<TodoListItemTextProps>(({ done }) => ({
  textDecoration: done ? 'line-through' : 'initial',
}))

const TodoItem: React.FC<TodoItemProps> = ({ todo: t }) => {
  // const [{ fetching, data }] = useTodoUpdatedSubscription({
  //   variables: { id: todo._id },
  // })
  const done = useTodoStore(store => store.todo.completeTodo)
  const deleteTodo = useTodoStore(store => store.todo.deleteTodo)

  const label = useMemo(() => `todo-checkbox-${t._id}`, [t._id])
  // const t = useMemo(() => data?.todoUpdated ?? todo, [data?.todoUpdated, todo])

  return (
    <ListItem
      role='listitem'
      disabled={false}
      secondaryAction={
        <IconButton
          edge='end'
          aria-label='deletes'
          onClick={_e => {
            deleteTodo(t._id)
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
            checked={t.done}
            tabIndex={-1}
            disableRipple
            onClick={_e => {
              console.log('checked')

              done(t._id)
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
          primary={t.todo}
          primaryTypographyProps={{
            role: 'contentinfo',
          }}
          secondary={format(new Date(t.createdAt), FORMATTER)}
          secondaryTypographyProps={{
            role: 'timer',
          }}
          done={t.done}
        />
      </ListItemButton>
    </ListItem>
  )
}

export default TodoItem
