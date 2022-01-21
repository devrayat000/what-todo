import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('todo', table => {
    table.increments('_id').primary()
    table.string('todo').notNullable()
    table.text('description').notNullable()
    table.boolean('done').notNullable().defaultTo(false)
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('todo')
}
