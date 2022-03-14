import { useEffect, useMemo } from 'react'
import ListItem, { ListItemProps } from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText, { ListItemTextProps } from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import format from 'date-fns/format'

import { FORMATTER } from '../utils/const'
import { Todo, useTodoUpdatedSubscription } from '../graphql/generated'
import { useStoreActions, useTodoStore } from '../utils/store'
import TodoCheckbox from './checkbox'

export interface TodoItemProps extends Pick<ListItemProps, 'divider'> {
  todo: Todo
}

const TodoItem: React.FC<TodoItemProps> = ({ todo: t, ...rest }) => {
  // const [{ fetching, data }] = useTodoUpdatedSubscription({
  //   variables: { id: todo._id },
  // })
  const done = useStoreActions(store => store.todo.completeTodo)
  const deleteTodo = useStoreActions(store => store.todo.deleteTodo)

  const label = useMemo(() => `todo-checkbox-${t._id}`, [t._id])
  // const t = useMemo(() => data?.todoUpdated ?? todo, [data?.todoUpdated, todo])

  useEffect(() => {
    console.log(t._id, t.done)
  }, [t._id, t.done])

  return (
    <ListItem
      role='listitem'
      disabled={false}
      sx={{
        px: t => t.spacing(3.5),
        py: t => t.spacing(0.75),
        fontSize: '1rem',
      }}
      // secondaryAction={
      //   <IconButton
      //     edge='end'
      //     aria-label='deletes'
      //     sx={{ fontSize: 'inherit' }}
      //     onClickCapture={_e => {
      //       console.log('deleted')

      //       deleteTodo(t._id)
      //     }}
      //   >
      //     <DeleteIcon />
      //   </IconButton>
      // }
      disablePadding
      button
      onClick={_e => {
        console.log('checked', t._id)

        done(t._id)
        // mutate(fetchedTodo ?? todo)
      }}
      {...rest}
    >
      <ListItemIcon>
        <TodoCheckbox
          edge='start'
          checked={t.done}
          tabIndex={-1}
          disableRipple
          // onClick={}
          inputProps={{
            'aria-labelledby': label,
            role: 'checkbox',
          }}
        />
      </ListItemIcon>
      <ListItemText
        id={label}
        primary={t.todo}
        primaryTypographyProps={{
          role: 'contentinfo',
          variant: 'h5',
          component: 'h5',
        }}
        sx={{ textDecoration: t.done ? 'line-through' : 'initial' }}
        // secondary={format(new Date(t.createdAt), FORMATTER)}
        // secondaryTypographyProps={{
        //   role: 'timer',
        // }}
      />
      <IconButton
        edge='end'
        aria-label='deletes'
        sx={{ fontSize: 'inherit' }}
        onClickCapture={_e => {
          console.log('deleted')

          deleteTodo(t._id)
        }}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}

export default TodoItem
