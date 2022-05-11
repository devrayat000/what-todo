import type Todo from '$lib/utils/todo'
import type { Theme } from '@mui/material'
import type { Action, Computed } from 'easy-peasy'

export const enum FilterState {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

interface TodoModel {
  items: Todo[]
  filterState: FilterState
  remaining: Computed<this, Todo[], StoreModel>
  createTodo: Action<this, { text: string; desc: string; done?: boolean }>
  completeTodo: Action<this, string>
  deleteTodo: Action<this, string>
  deleteCompleted: Action<this>
  // Filter
  filter: Action<this, FilterState>
  filteredItems: Computed<this, Todo[], StoreModel>
}

interface ThemeModel {
  item: Theme
  toggleTheme: Action<this>
  setTheme: Action<this, Theme>
}

export interface InitialState {
  todo: { items: Todo[]; filterState: FilterState }
  theme: { item: Theme }
}

export interface StoreModel extends InitialState {
  todo: TodoModel
  theme: ThemeModel
}
