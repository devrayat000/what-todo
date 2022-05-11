import { action, computed, createStore, createTypedHooks } from 'easy-peasy'

import { darkTheme, lightTheme } from '../../styles/theme'
import { FilterState, InitialState, StoreModel } from '../interfaces'
import Todo from './todo'

const fakeTodos = [
  new Todo('Todo 1', ''),
  new Todo('Todo 2', ''),
  new Todo('Todo 3', ''),
  new Todo('Todo 4', ''),
]

const initialState: InitialState = {
  todo: {
    items: process.env.NODE_ENV !== 'production' ? fakeTodos : [],
    filterState: FilterState.ALL,
  },
  theme: {
    item: lightTheme,
  },
}

const todoModel: StoreModel['todo'] = {
  ...initialState.todo,
  remaining: computed([state => state.items], todos => {
    return todos.filter(item => !item.done)
  }),
  createTodo: action((state, { text, desc, done = false }) => {
    state.items.push(new Todo(text, desc, done))
  }),
  completeTodo: action((state, id) => {
    state.items = state.items.map(item => {
      if (item._id === id) {
        return {
          ...item,
          done: !item.done,
        }
      }
      return item
    })
  }),
  deleteTodo: action((state, id) => {
    state.items = state.items.filter(item => item._id !== id)
  }),
  deleteCompleted: action(state => {
    state.items = state.items.filter(item => !item.done)
  }),
  filter: action((state, payload) => {
    state.filterState = payload
  }),
  filteredItems: computed(
    [state => state.filterState, state => state.items],
    (filterState, todos) => {
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
    }
  ),
}

const themeModel: StoreModel['theme'] = {
  ...initialState.theme,
  toggleTheme: action(state => {
    state.item = state.item.palette.mode === 'light' ? darkTheme : lightTheme
  }),
  setTheme: action((state, newTheme) => {
    state.item = newTheme
  }),
}

const storeModel: StoreModel = {
  todo: todoModel,
  theme: themeModel,
}

export const store = createStore(storeModel, {
  // initialState: preloadedState,
  name: 'todo-store',
  devTools: process.env.NODE_ENV !== 'production',
})

export const {
  useStoreActions,
  useStore,
  useStoreState: useTodoStore,
} = createTypedHooks<StoreModel>()
