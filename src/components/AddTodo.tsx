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
import {
  CheckBoxRounded,
  CheckCircle,
  RadioButtonUnchecked,
  Add,
} from '@mui/icons-material'
import withProps from '../utils/withProps'
import { useStoreActions, useTodoStore } from '../utils/store'
import {
  InputBase,
  Checkbox,
  SvgIcon,
  Divider,
  IconButton,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import TodoCheckbox from './checkbox'

const useStyles = makeStyles(theme => ({
  container: {
    boxShadow: theme.shadows[3],
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    fontSize: '1rem',
  },
  addTodo: {
    padding: theme.spacing(1.25),
    flex: 1,
    fontSize: 'inherit',
  },
}))

const AddTodo: React.FC = () => {
  const addTodo = useStoreActions(store => store.todo.createTodo)

  const classes = useStyles()

  const inputRef = useRef<HTMLInputElement>(null)
  const render = useRef(0)
  console.log('add todo rendered:', ++render.current)

  const handleCreateTodo = useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(async e => {
    e.preventDefault()
    if (inputRef.current?.value) {
      // Add Todo
      addTodo({
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, et?',
        text: inputRef.current.value,
      })
      inputRef.current.value = ''
    }
  }, [])

  return (
    <Paper component='form' className={classes.container}>
      <TodoCheckbox name='create-todo-checkbox' />
      <InputBase
        placeholder='Create a new todo..'
        fullWidth
        color='primary'
        className={classes.addTodo}
        inputRef={inputRef}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
      <IconButton sx={{ fontSize: 'inherit' }} onClick={handleCreateTodo}>
        <Add />
      </IconButton>
    </Paper>
  )
}

export default AddTodo

const FormPaper = withProps(Paper, { elevation: 2, component: 'form' })
