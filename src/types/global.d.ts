import { Knex } from 'knex'
import { Todo as ITodo } from '../graphql/generated'

export {}

declare module 'knex/types/tables' {
  type IInsertTodo = Omit<ITodo, '_id' | 'createdAt' | 'done'>
  type InsertTodo = {
    [K in keyof IInsertTodo]: IInsertTodo[K] | Knex.Raw
  }

  type IUpdateTodo = Omit<ITodo, '_id' | 'createdAt'>
  type UpdateTodo = {
    [K in keyof IUpdateTodo]?: IUpdateTodo[K] | Knex.Raw
  }

  interface Todo extends ITodo {}

  interface Tables {
    todo: Knex.CompositeTableType<Todo, InsertTodo, UpdateTodo>
  }
}
