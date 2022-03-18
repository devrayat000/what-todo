import { useTodoStore } from '../../utils/store'
import TodoList from './TodoList'

const Todos = () => {
  const todos = useTodoStore(store => store.todo.filteredItems)
  const remaining = useTodoStore(store => store.todo.remaining)
  return <TodoList todos={todos} remaining={remaining.length} />
}

export default Todos
