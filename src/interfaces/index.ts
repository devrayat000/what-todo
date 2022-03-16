import type { Theme } from '@mui/material'
import type { Action, ActionOn, Computed } from 'easy-peasy'

import type { Todo } from '../graphql/generated'

interface TodoModel {
  items: Todo[]
  remaining: Computed<this, Todo[], StoreModel>
  createTodo: Action<this, { text: string; desc: string }>
  completeTodo: Action<this, string>
  deleteTodo: Action<this, string>
  deleteCompleted: Action<this>
}

interface ThemeModel {
  item: Theme
  toggleTheme: Action<this>
  setTheme: Action<this, Theme>
}

export interface InitialState {
  todo: { items: Todo[] }
  theme: { item: Theme }
}

export interface StoreModel extends InitialState {
  todo: TodoModel
  theme: ThemeModel
}
