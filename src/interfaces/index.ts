import { Theme } from '@mui/material'
import { Todo } from '../graphql/generated'

export interface StoreModel {
  todo: {
    items: Todo[]
    createTodo(text: string, desc: string): void
    completeTodo(id: string): void
    deleteTodo(id: string): void
    deleteAll(): void
  }
  theme: {
    item: Theme
    toggleTheme(): void
    setTheme(newTheme: Theme): void
  }
}
