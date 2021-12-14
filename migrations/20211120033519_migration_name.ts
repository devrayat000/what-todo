import 'dotenv/config'
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  // Todos table
  await knex.schema.createTable('todos', table => {
    table
      .uuid('_id')
      .index('todo_id_index')
      .defaultTo(knex.raw('gen_random_uuid()'))
      .primary()
    table
      .specificType('user_id', 'CHAR(36)')
      .notNullable()
      .references('user_id')
      .inTable('all_auth_recipe_users')
      .onDelete('CASCADE')
    table.string('note').notNullable()
    table.boolean('done').notNullable().defaultTo(false)
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('todos')
}
