import type { Todo } from '$graphql/generated'
import type { Knex } from 'knex'

export async function getTodos(knex: Knex) {
  const todos = await knex('todo')
  return todos.map(serializeBool)
}

export async function getTodoById(knex: Knex, id: string) {
  const [todo] = await knex('todo').where({ _id: id }).limit(1)
  return serializeBool(todo)
}

export async function createTodo(
  knex: Knex,
  todo: string,
  description: string
) {
  const [newTodo] = await knex('todo')
    .insert({ todo, description })
    .returning('*')

  return serializeBool(newTodo)
}

export async function updateTodo(
  knex: Knex,
  id: string,
  todo?: string,
  description?: string
) {
  const query = knex('todo')
    .update({ todo, description })
    .where({ _id: id })
    .toSQL()

  const [updatedTodo] = await knex.raw(
    `${query.sql} RETURNING *`,
    query.bindings
  )
  //   const [updatedTodo] = await knex('todo')
  //     .update({ todo, description })
  //     .where({ _id: id })
  //     .returning('*')

  return serializeBool(updatedTodo)
}

export async function deleteTodo(knex: Knex, id: string) {
  const query = knex('todo').delete().where({ _id: id }).toSQL()

  const [deletedTodo] = await knex.raw(
    `${query.sql} RETURNING *`,
    query.bindings
  )

  return serializeBool(deletedTodo)
}

export async function toggleDone(knex: Knex, id: string) {
  const query = knex('todo')
    .update({ done: knex.raw('NOT ??', ['done']) })
    .where({ _id: id })
    .toSQL()

  const [toggledTodo] = await knex.raw(
    `${query.sql} RETURNING *`,
    query.bindings
  )

  return serializeBool(toggledTodo)
}

function serializeBool(todo: Todo) {
  return {
    ...todo,
    done:
      typeof todo.done === 'number'
        ? !!todo.done
        : (todo.done as any) === 'false'
        ? false
        : true,
  }
}
