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
import { useTodoStore } from '../utils/store'
import {
  InputBase,
  Checkbox,
  SvgIcon,
  Divider,
  IconButton,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  container: {
    boxShadow: theme.shadows[4],
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  addTodo: {
    padding: theme.spacing(1.25),
    flex: 1,
  },
  check: {
    '&.Mui-checked': {
      // color: 'hsl(280, 87%, 65%)',
      background:
        '-webkit-linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  },
}))

const AddTodo: React.FC = () => {
  const addTodo = useTodoStore(store => store.todo.createTodo)

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
      addTodo(
        inputRef.current.value,
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, et?'
      )
      inputRef.current.value = ''
    }
  }, [])

  return (
    <Paper component='form' className={classes.container}>
      <Checkbox
        icon={<RadioButtonUnchecked sx={{ color: t => t.palette.grey[500] }} />}
        checkedIcon={
          <SvgIcon sx={{ fill: 'url(#gradient-horizontal)' }}>
            <defs>
              <linearGradient
                id='gradient-horizontal'
                x1={0}
                y1={0}
                x2={1}
                y2={1}
              >
                <stop offset='0%' stop-color='hsl(192, 100%, 67%)' />
                <stop offset='100%' stop-color='hsl(280, 87%, 65%)' />
              </linearGradient>
            </defs>
            <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
          </SvgIcon>
        }
        className={classes.check}
      />

      <InputBase
        placeholder='Create a new todo..'
        fullWidth
        color='primary'
        className={classes.addTodo}
        inputRef={inputRef}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
      <IconButton onClick={handleCreateTodo}>
        <Add />
      </IconButton>
    </Paper>
  )
}

export default AddTodo

const FormPaper = withProps(Paper, { elevation: 2, component: 'form' })
