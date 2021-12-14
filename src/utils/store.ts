import create, { StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import createContext from 'zustand/context'

import type { StoreModel } from '../interfaces'
import Todo from './todo'

const store: StateCreator<StoreModel> = set => ({
  todos: [],
  createTodo(text) {
    const newTodo = new Todo(text)
    set(prev => ({
      todos: [...prev.todos, newTodo],
    }))
  },
  completeTodo(id) {
    set(prev => ({
      todos: prev.todos.map(todo => {
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
      todos: prev.todos.filter(todo => todo._id !== id),
    }))
  },
  deleteAll() {
    set({
      todos: [],
    })
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
        ;(deserialized.state as StoreModel).todos.map(todo => {
          return {
            ...todo,
            createdAt: new Date(todo.createdAt),
          }
        })
        return deserialized
      },
      merge: (persistedState: StoreModel, currentState) => {
        currentState.todos = currentState.todos
          .filter(todo =>
            persistedState.todos.some(prev => prev.note === todo.note)
          )
          .map(todo => {
            return {
              ...todo,
              _id:
                persistedState.todos.find(prev => prev.note === todo.note)
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
