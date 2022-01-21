import { Knex } from 'knex'

const todos = [
  {
    _id: 1,
    todo: 'todo 1',
    description: 'desc 1',
    done: false,
  },
  {
    _id: 2,
    todo: 'todo 2',
    description: 'desc 2',
    done: false,
  },
  {
    _id: 3,
    todo: 'todo 2',
    description: 'desc 2',
    done: false,
  },
]

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('todo').del()

  // Inserts seed entries
  await knex('todo').insert(todos)
}
