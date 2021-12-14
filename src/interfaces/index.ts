export interface StoreModel {
  todos: ITodo[]
  createTodo(text: string): void
  completeTodo(id: string): void
  deleteTodo(id: string): void
  deleteAll(): void
}

export interface ITodo {
  _id: string
  user_id: string
  note: string
  done: boolean
  createdAt: Date
}
