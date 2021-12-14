import type { Knex } from 'knex'
import type { ITodo } from './'
declare module 'knex/types/tables' {
  interface Tables {
    todos: Knex.CompositeTableType<
      TodoTable,
      { note: string; user_id: string },
      { done: boolean | Knex.Raw<boolean> },
      { done: boolean }
    >
  }

  interface TodoTable extends Omit<ITodo, 'createdAt'> {
    created_at: Date
    user_id: string
  }
}
