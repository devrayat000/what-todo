import { useRef, useCallback } from 'react'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import {
  signOut,
  redirectToAuth,
} from 'supertokens-auth-react/recipe/emailpassword'

import withProps from '../utils/withProps'
import { useTodoStore } from '../utils/store'

const AddTodo = () => {
  const addTodo = useTodoStore(store => store.todo.createTodo)

  const inputRef = useRef<HTMLInputElement>(null)
  const render = useRef(0)
  console.log('add todo rendered:', ++render.current)

  // const { add, isLoading, isError, error } = useAddTodo()

  const handleCreateTodo = useCallback<React.FormEventHandler<HTMLDivElement>>(
    async e => {
      e.preventDefault()
      if (inputRef.current?.value) {
        // Add Todo
        addTodo(
          inputRef.current.value,
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, et?'
        )
        inputRef.current.value = ''
      }
    },
    []
  )

  return (
    <Box
      padding={1}
      display='grid'
      gap={1}
      component={FormPaper}
      onSubmit={handleCreateTodo}
    >
      <TextField inputRef={inputRef} fullWidth />
      <Box display='flex' justifyContent='flex-end' gap={2}>
        <Button
          variant='outlined'
          color='info'
          type='reset'
          sx={{
            px: 6,
          }}
          disabled={false}
          onClick={async e => {
            e.preventDefault()
            // await signOut()
            // redirectToAuth()
          }}
        >
          Logout
        </Button>
        <Button
          variant='outlined'
          color='secondary'
          type='reset'
          sx={{
            px: 6,
          }}
          disabled={false}
        >
          Clear
        </Button>
        <Button
          variant='contained'
          color='primary'
          type='submit'
          sx={{
            px: 6,
          }}
          disabled={false}
        >
          Add
        </Button>
      </Box>
      {/* <Collapse in={isError}>
        <Typography color='crimson' variant='subtitle2'>
          {error?.message}
        </Typography>
      </Collapse> */}
    </Box>
  )
}

export default AddTodo

const FormPaper = withProps(Paper, { elevation: 2, component: 'form' })
