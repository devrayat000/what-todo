import List from '@mui/material/List'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import { TransitionGroup } from 'react-transition-group'
import { Button, Divider, ListItem, Typography } from '@mui/material'

import FilterTodos from '../filter'
import TodoItem from '../todo-item/TodoItem'
import Todo from '$lib/utils/todo'
import withProps from '$lib/utils/withProps'

const TodoList: React.FC<{ todos: Todo[]; remaining: number }> = ({
  todos,
  remaining,
}) => {
  return (
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
            {remaining} items left
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <FilterTodos />
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

export default TodoList

const UlPaper = withProps(Paper, { elevation: 20, component: 'ul' })
