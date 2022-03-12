import { useRef, useCallback, useEffect } from 'react'
import List from '@mui/material/List'
import Collapse from '@mui/material/Collapse'
import { TransitionGroup } from 'react-transition-group'
import shallow from 'zustand/shallow'

import TodoItem from './TodoItem'
import { Todo } from '../graphql/generated'
import { useTodoStore } from '../utils/store'

const Todos: React.FC = () => {
  const todos = useTodoStore(store => store.todo.items)

  const render = useRef(0)
  console.log('todos rendered:', ++render.current)

  return (
    <List>
      <TransitionGroup>
        {todos.map(todo => {
          return (
            <Collapse key={todo._id}>
              <TodoItem todo={todo} />
            </Collapse>
          )
        })}
      </TransitionGroup>
    </List>
  )
}

export default Todos
