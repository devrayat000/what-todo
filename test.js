const knexF = require('knex').default

const knex = knexF({
  client: 'better-sqlite3',
  connection: {
    filename: './dev.sqlite3',
  },
  useNullAsDefault: true,
})
;(async () => {
  const [todo] = await knex('todo').limit(1)
  console.log(todo)
  console.log(todo.done)
  console.log(typeof todo.done)

  //   let g = knex('todo')
  //     .update({ done: knex.raw('NOT ??', ['done']) })
  //     .where({ _id: 1 })
  //     .returning('*', )
  // .returning('*')

  //   console.log(g.toSQL().sql)

  const [updatedTodo] = await knex.raw(
    /*sql*/ `
    UPDATE "todo" SET "done" = NOT "done" WHERE "_id" = ? RETURNING *;
  `,
    [1]
  )

  console.log(updatedTodo)

  process.exit(0)
})()
