import create, { StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import createContext from 'zustand/context'

import type { StoreModel } from '../interfaces'
import Todo from './todo'
import { darkTheme, lightTheme } from '../styles/theme'

const store: StateCreator<StoreModel> = set => ({
  todo: {
    items: [],
    createTodo(text, desc) {
      const newTodo = new Todo(text, desc)
      set(prev => ({
        ...prev,
        items: [...prev.todo.items, newTodo],
      }))
    },
    completeTodo(id) {
      set(prev => ({
        ...prev,
        items: prev.todo.items.map(todo => {
          if (todo._id === id) {
            return {
              ...todo,
              done: !todo.done,
            }
          }
          return todo
        }),
      }))
    },
    deleteTodo(id) {
      set(prev => ({
        ...prev,
        items: prev.todo.items.filter(todo => todo._id !== id),
      }))
    },
    deleteAll() {
      set(prev => ({
        ...prev,
        items: [],
      }))
    },
  },
  theme: {
    item: lightTheme,
    toggleTheme() {
      set(prev => ({
        ...prev,
        item: prev.theme.item === lightTheme ? darkTheme : lightTheme,
      }))
    },
    setTheme(newTheme) {
      set(prev => ({
        ...prev,
        item: newTheme,
      }))
    },
  },
})

export const useCreatedStore = create<StoreModel>(
  devtools(
    persist(store, {
      name: 'todo-storage',
      getStorage: () => localStorage,
      serialize: JSON.stringify,
      deserialize(persisted) {
        const deserialized = JSON.parse(persisted)
        ;(deserialized.state as StoreModel).todo.items.map(todo => {
          return {
            ...todo,
            createdAt: new Date(todo.createdAt),
          }
        })
        return deserialized
      },
      merge: (persistedState: StoreModel, currentState) => {
        currentState.todo.items = currentState.todo.items
          .filter(todo =>
            persistedState.todo.items.some(prev => prev.todo === todo.todo)
          )
          .map(todo => {
            return {
              ...todo,
              _id:
                persistedState.todo.items.find(prev => prev.todo === todo.todo)
                  ?._id ?? todo._id,
            }
          })
        return currentState
      },
    }),
    {
      name: 'todo-store',
    }
  )
)
export const createStore = () => useCreatedStore

const { Provider, useStore } = createContext<StoreModel>()

export { Provider, useStore as useTodoStore }
