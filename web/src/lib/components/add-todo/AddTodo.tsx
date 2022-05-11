import { useRef, useCallback } from 'react'
import Paper from '@mui/material/Paper'
import { Add } from '@mui/icons-material'
import { InputBase, Divider, IconButton } from '@mui/material'

import { useStoreActions } from '$lib/utils/store'
import TodoCheckbox from '../checkbox'

export interface MyAddTodoProps {
  createTodo(text: string, done?: boolean): void | Promise<void>
}

export const MyAddTodo: React.FC<MyAddTodoProps> = ({ createTodo }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const doneRef = useRef<HTMLButtonElement>(null)
  const render = useRef(0)
  console.log('add todo rendered:', ++render.current)

  const handleCreateTodo = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(async e => {
    e.preventDefault()
    if (inputRef.current?.value) {
      await createTodo(inputRef.current.value, !!doneRef.current?.value)
      inputRef.current.value = ''
    }
  }, [])

  return (
    <Paper
      component='form'
      sx={{
        boxShadow: theme => theme.shadows[3],
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme => theme.spacing(1),
        paddingRight: theme => theme.spacing(1),
        fontSize: '1rem',
      }}
    >
      <TodoCheckbox name='create-todo-checkbox' ref={doneRef} />
      <InputBase
        placeholder='Create a new todo..'
        fullWidth
        color='primary'
        sx={{
          p: theme => theme.spacing(1.25),
          flex: 1,
          fontSize: 'inherit',
        }}
        inputRef={inputRef}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
      <IconButton sx={{ fontSize: 'inherit' }} onClick={handleCreateTodo}>
        <Add />
      </IconButton>
    </Paper>
  )
}

const AddTodo: React.FC = () => {
  const addTodo = useStoreActions(store => store.todo.createTodo)

  return (
    <MyAddTodo
      createTodo={(text, done) =>
        addTodo({
          desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, et?',
          text,
          done,
        })
      }
    />
  )
}

export default AddTodo
