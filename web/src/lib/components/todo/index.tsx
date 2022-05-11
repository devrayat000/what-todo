import { useStoreActions, useTodoStore } from '../../utils/store'
import TodoList from './TodoList'

const Todos = () => {
  const todos = useTodoStore(store => store.todo.filteredItems)
  const remaining = useTodoStore(store => store.todo.remaining)
  const clearCompleted = useStoreActions(action => action.todo.deleteCompleted)

  return (
    <TodoList
      todos={todos}
      remaining={remaining.length}
      clearCompleted={clearCompleted}
    />
  )
}

export default Todos
