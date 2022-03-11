import { useRef, useCallback, useEffect } from 'react'
import List from '@mui/material/List'
import Collapse from '@mui/material/Collapse'
import { TransitionGroup } from 'react-transition-group'
import shallow from 'zustand/shallow'

// import { useTodoStore } from '../utils/store'
import TodoItem from './TodoItem'
import { ITodo } from '../interfaces'
import { Todo } from '../graphql/generated'

const Todos = ({ todos }: { todos?: Todo[] }) => {
  // const { deleteTodo, completeTodo } = useTodoStore(
  //   useCallback(
  //     store => ({
  //       completeTodo: store.completeTodo,
  //       deleteTodo: store.deleteTodo,
  //     }),
  //     []
  //   ),
  //   shallow
  // )

  // useEffect(() => {
  //   console.log(todos)
  // }, [todos])

  const render = useRef(0)
  console.log('todos rendered:', ++render.current)

  return (
    <List>
      <TransitionGroup>
        {todos?.map(todo => {
          return (
            <Collapse key={todo._id}>
              <TodoItem
                // onDelete={deleteTodo}
                // onDone={completeTodo}
                todo={todo}
              />
            </Collapse>
          )
        })}
      </TransitionGroup>
    </List>
  )
}

export default Todos
