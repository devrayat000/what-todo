import { useMemo } from 'react'
import {
  action,
  actionOn,
  computed,
  createStore,
  createTypedHooks,
  Store,
} from 'easy-peasy'

import { darkTheme, lightTheme } from '../styles/theme'
import type { InitialState, StoreModel } from '../interfaces'
import Todo from './todo'

let store: Store<StoreModel> | undefined

const initialState: InitialState = {
  todo: {
    items: [
      new Todo('Todo 1', ''),
      new Todo('Todo 2', ''),
      new Todo('Todo 3', ''),
      new Todo('Todo 4', ''),
    ],
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

function initStore(preloadedState = initialState) {
  return createStore(storeModel, {
    initialState: preloadedState,
    name: 'todo-store',
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export const initializeStore = (preloadedState?: InitialState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useInitialStore(initialState?: InitialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}

const { useStoreActions, useStore, useStoreState } =
  createTypedHooks<StoreModel>()

export { useStoreActions, useStore, useStoreState as useTodoStore }
