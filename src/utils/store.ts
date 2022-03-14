import { action, computed, createStore, createTypedHooks } from 'easy-peasy'

import { darkTheme, lightTheme } from '../styles/theme'
import type { StoreModel } from '../interfaces'
import Todo from './todo'

export const store = createStore<StoreModel>(
  {
    todo: {
      items: [
        new Todo('Todo 1', ''),
        new Todo('Todo 2', ''),
        new Todo('Todo 3', ''),
        new Todo('Todo 4', ''),
      ],
      remaining: computed([state => state.items], todos => {
        return todos.filter(item => !item.done)
      }),
      createTodo: action((state, { text, desc }) => {
        state.items.push(new Todo(text, desc))
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
    },

    theme: {
      item: lightTheme,
      toggleTheme: action(state => {
        state.item =
          state.item.palette.mode === 'light' ? darkTheme : lightTheme
      }),
      setTheme: action((state, newTheme) => {
        state.item = newTheme
      }),
    },
  },
  {
    name: 'todo-store',
    devTools: process.env.NODE_ENV !== 'production',
  }
)

// export const createStore = () => store

const { useStoreActions, useStore, useStoreState } =
  createTypedHooks<StoreModel>()

export { useStoreActions, useStore, useStoreState as useTodoStore }
