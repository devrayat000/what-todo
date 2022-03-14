import { useRef, useCallback, useEffect } from 'react'
import List from '@mui/material/List'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import { TransitionGroup } from 'react-transition-group'

import TodoItem from './TodoItem'
import { Todo } from '../graphql/generated'
import { useTodoStore } from '../utils/store'
import withProps from '../utils/withProps'
import { Button, Divider, ListItem, Typography } from '@mui/material'

const Todos: React.FC = () => {
  const todos = useTodoStore(store => store.todo.items)
  const remaining = useTodoStore(store => store.todo.remaining)

  const render = useRef(0)
  console.log('todos rendered:', ++render.current)

  return (
    // <Paper elevation={10}>
    <List component={UlPaper} sx={{ p: 0 }}>
      <TransitionGroup>
        {todos.map((todo, index) => {
          return (
            <Collapse key={todo._id} component='li'>
              <TodoItem todo={todo} divider={index < todos.length - 1} />
            </Collapse>
          )
        })}
      </TransitionGroup>
      <Divider />
      <Box component='li'>
        <ListItem
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='button' component='h6'>
            {remaining.length} items left
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='button' component={Button}>
              All
            </Typography>
            <Typography variant='button' component={Button}>
              Active
            </Typography>
            <Typography variant='button' component={Button}>
              Completed
            </Typography>
          </Box>

          <Typography variant='button' component={Button}>
            Clear Completed
          </Typography>
        </ListItem>
      </Box>
    </List>
    // </Paper>
  )
}

const UlPaper = withProps(Paper, { elevation: 20, component: 'ul' })

export default Todos
