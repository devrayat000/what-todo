import { useRef, useCallback, useEffect, useState, useMemo } from 'react'
import List from '@mui/material/List'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import { TransitionGroup } from 'react-transition-group'

import TodoItem from './TodoItem'
import { Todo } from '../graphql/generated'
import { useStoreActions, useTodoStore } from '../utils/store'
import withProps from '../utils/withProps'
import {
  Button,
  Divider,
  ListItem,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  styled,
} from '@mui/material'

const enum FilterState {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: 'inherit',
    color: theme.palette.primary.main,
  },
}))

const Todos: React.FC = () => {
  const todos = useTodoStore(store => store.todo.items)
  const remaining = useTodoStore(store => store.todo.remaining)

  const render = useRef(0)
  console.log('todos rendered:', ++render.current)

  const [filterState, setFilterState] = useState<FilterState>(FilterState.ALL)
  const tts = useMemo<Todo[]>(() => {
    switch (filterState) {
      case FilterState.ALL:
        return todos
      case FilterState.ACTIVE:
        return todos.filter(todo => !todo.done)
      case FilterState.COMPLETED:
        return todos.filter(todo => todo.done)
      default:
        return todos
    }
  }, [todos, filterState])

  return (
    // <Paper elevation={10}>
    <List component={UlPaper} sx={{ p: 0 }}>
      <TransitionGroup>
        {tts.map((todo, index) => {
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
            <StyledToggleButtonGroup
              exclusive
              value={filterState}
              onChange={(e, alignment) => {
                setFilterState(alignment)
              }}
            >
              <Typography
                variant='button'
                component={StyledToggleButton}
                value={FilterState.ALL}
              >
                All
              </Typography>
              <Typography
                variant='button'
                component={StyledToggleButton}
                value={FilterState.ACTIVE}
              >
                Active
              </Typography>
              <Typography
                variant='button'
                component={StyledToggleButton}
                value={FilterState.COMPLETED}
              >
                Completed
              </Typography>
            </StyledToggleButtonGroup>
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
